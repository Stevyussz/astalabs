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

    // 5. If correct, check blood status and update user atomically
    let awardedPoints = isCorrect ? challenge.points : 0;
    let bloodTier: number | undefined = undefined;

    if (isCorrect) {
      // Calculate blood rank! 
      const existingSolvesCount = await submissionRepository.countCorrectSolves(challengeId);
      
      let bonusXp = 0;
      if (existingSolvesCount === 0) {
        bloodTier = 1;
        bonusXp = 50;
      } else if (existingSolvesCount === 1) {
        bloodTier = 2;
        bonusXp = 30;
      } else if (existingSolvesCount === 2) {
        bloodTier = 3;
        bonusXp = 15;
      }

      awardedPoints = challenge.points + bonusXp;

      const updateSuccess = await userRepository.addSolvedChallenge(userId, challengeId, awardedPoints);
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
      bloodTier,
    } as any);

    let successMessage = `Correct! You earned ${awardedPoints} points!`;
    if (bloodTier === 1) successMessage = `FIRST BLOOD!!🩸 +50 Bonus XP! Total: ${awardedPoints} points!`;
    else if (bloodTier === 2) successMessage = `SECOND BLOOD!🩸 +30 Bonus XP! Total: ${awardedPoints} points!`;
    else if (bloodTier === 3) successMessage = `THIRD BLOOD!🩸 +15 Bonus XP! Total: ${awardedPoints} points!`;
    
    return {
      isCorrect,
      message: isCorrect
        ? successMessage
        : 'Incorrect flag. Try again!',
      pointsAwarded: isCorrect ? awardedPoints : undefined,
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
