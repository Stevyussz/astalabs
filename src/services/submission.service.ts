// src/services/submission.service.ts
import { submissionRepository } from '@/repositories/submission.repository';
import { challengeRepository } from '@/repositories/challenge.repository';
import { userRepository } from '@/repositories/user.repository';
import { submitFlagSchema, SubmitFlagInput } from '@/validations/submission';
import { compareFlag } from '@/lib/utils';
import { checkSubmissionCooldown } from '@/lib/rate-limit';
import { SubmissionResult } from '@/types';
import { scoreboardService } from '@/services/scoreboard.service';

export class SubmissionService {
  /**
   * Process a flag submission.
   * Flow:
   *   1. Validate input
   *   2. Check cooldown (anti-brute-force)
   *   3. Check for existing correct solve (prevent duplicate points)
   *   4. Fetch challenge with flag hash (internal only)
   *   5. Compare flag (timing-safe)
   *   6. If correct → update user score + solved list + challenge solve count
   *   7. Record submission either way
   */
  async submitFlag(input: SubmitFlagInput, userId: string): Promise<SubmissionResult> {
    const validatedInput = submitFlagSchema.parse(input);
    const { challengeId, flag } = validatedInput;

    // 1. Anti-brute-force cooldown (5 seconds between attempts per challenge)
    const cooldownMs = checkSubmissionCooldown(userId, challengeId, 5000);
    if (cooldownMs > 0) {
      throw new Error(`COOLDOWN:${cooldownMs}`);
    }

    // 2. Check for duplicate correct solve
    const existingSolve = await submissionRepository.findCorrectSolve(userId, challengeId);
    if (existingSolve) {
      return {
        isCorrect: true,
        message: 'You have already solved this challenge!',
      };
    }

    // 3. Get challenge with flag hash (INTERNAL only — never returned to client)
    const challenge = await challengeRepository.findByIdWithFlag(challengeId);
    if (!challenge || !challenge.isActive) {
      throw new Error('CHALLENGE_NOT_FOUND');
    }

    // 4. Timing-safe flag comparison
    const isCorrect = compareFlag(flag, challenge.flagHash);

    // 5. If correct, update user atomically with anti-race-condition protection
    if (isCorrect) {
      const updateSuccess = await userRepository.addSolvedChallenge(userId, challengeId, challenge.points);
      // If updateSuccess is null, they already have it in their array (due to concurrent attempt)
      // Only increment global challenge stats & scoreboard if we actually awarded points
      if (updateSuccess) {
        await challengeRepository.incrementSolveCount(challengeId);
        scoreboardService.invalidateCache();
      }
    }

    // 6. Record submission (always, even incorrect — for anti-cheat analytics)
    await submissionRepository.create({
      userId,
      challengeId,
      submittedFlag: flag,
      isCorrect,
    });

    return {
      isCorrect,
      message: isCorrect
        ? `Correct! You earned ${challenge.points} points!`
        : 'Incorrect flag. Try again!',
      pointsAwarded: isCorrect ? challenge.points : undefined,
    };
  }

  /** Get a user's submission history. */
  async getUserSubmissions(userId: string) {
    return submissionRepository.findByUser(userId);
  }

  /** Get failed attempt count for anti-cheat detection. */
  async getFailedAttempts(userId: string, challengeId: string): Promise<number> {
    return submissionRepository.countFailedAttempts(userId, challengeId);
  }
}

export const submissionService = new SubmissionService();
