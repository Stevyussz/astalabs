// src/services/challenge.service.ts
import { challengeRepository } from '@/repositories/challenge.repository';
import { CreateChallengeInput, FilterChallengeInput } from '@/validations/challenge';
import { hashFlag } from '@/lib/utils';
import { PaginatedResult, PublicChallenge } from '@/types';

export class ChallengeService {
  /** Get paginated, filtered list of challenges. flagHash is never exposed. */
  async getChallenges(
    filter: FilterChallengeInput,
    solvedChallengeIds: string[] = [],
  ): Promise<PaginatedResult<PublicChallenge>> {
    const result = await challengeRepository.findAll(filter);

    // Mark which challenges the current user has solved
    const solvedSet = new Set(solvedChallengeIds);
    result.items = result.items.map((c) => ({
      ...c,
      isSolved: solvedSet.has(c.id),
    }));

    return result;
  }

  /** Get a single challenge detail. flagHash is never included. */
  async getChallengeDetail(
    id: string,
    solvedChallengeIds: string[] = [],
  ): Promise<PublicChallenge | null> {
    const challenge = await challengeRepository.findById(id);
    if (!challenge) return null;

    return {
      ...challenge,
      isSolved: solvedChallengeIds.includes(id),
    };
  }

  /**
   * Create a challenge (admin/seeder).
   * Hashes the flag before storing — plaintext flag never persisted.
   */
  async createChallenge(input: CreateChallengeInput): Promise<PublicChallenge> {
    const flagHash = hashFlag(input.flag);

    const challenge = await challengeRepository.create({
      title: input.title,
      category: input.category,
      difficulty: input.difficulty,
      description: input.description,
      flagHash,
      points: input.points,
      hints: input.hints,
      isActive: input.isActive,
    });

    return {
      id: challenge._id.toString(),
      title: challenge.title,
      category: challenge.category,
      difficulty: challenge.difficulty,
      description: challenge.description,
      points: challenge.points,
      hints: challenge.hints,
      isActive: challenge.isActive,
      solveCount: challenge.solveCount,
      createdAt: challenge.createdAt,
    };
  }
}

export const challengeService = new ChallengeService();
