// src/repositories/submission.repository.ts
import { Types } from 'mongoose';
import Submission, { ISubmissionDocument } from '@/models/Submission';
import { connectDB } from '@/lib/db';

export class SubmissionRepository {
  /**
   * Check if a user has already correctly solved a challenge.
   * Uses the compound index (userId, challengeId) for O(log n) lookup.
   */
  async findCorrectSolve(
    userId: string,
    challengeId: string,
  ): Promise<ISubmissionDocument | null> {
    await connectDB();
    return Submission.findOne({
      userId: new Types.ObjectId(userId),
      challengeId: new Types.ObjectId(challengeId),
      isCorrect: true,
    }).lean<ISubmissionDocument>();
  }

  /** Record a submission attempt. */
  async create(data: {
    userId: string;
    challengeId: string;
    submittedFlag: string;
    isCorrect: boolean;
  }): Promise<ISubmissionDocument> {
    await connectDB();
    const submission = await Submission.create({
      userId: new Types.ObjectId(data.userId),
      challengeId: new Types.ObjectId(data.challengeId),
      submittedFlag: data.submittedFlag,
      isCorrect: data.isCorrect,
    });
    return submission.toObject() as ISubmissionDocument;
  }

  /** Get all submissions by a user (for profile display). */
  async findByUser(
    userId: string,
    limit = 50,
  ): Promise<ISubmissionDocument[]> {
    await connectDB();
    return Submission.find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean<ISubmissionDocument[]>();
  }

  /** Count incorrect attempts for a user on a specific challenge. */
  async countFailedAttempts(userId: string, challengeId: string): Promise<number> {
    await connectDB();
    return Submission.countDocuments({
      userId: new Types.ObjectId(userId),
      challengeId: new Types.ObjectId(challengeId),
      isCorrect: false,
    });
  }

  /** Count total correct solves for a challenge globally (to determine First Bloods). */
  async countCorrectSolves(challengeId: string): Promise<number> {
    await connectDB();
    return Submission.countDocuments({
      challengeId: new Types.ObjectId(challengeId),
      isCorrect: true,
    });
  }
}

export const submissionRepository = new SubmissionRepository();
