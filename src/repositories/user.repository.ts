// src/repositories/user.repository.ts
import { Types } from 'mongoose';
import User, { IUserDocument } from '@/models/User';
import { connectDB } from '@/lib/db';
import { ScoreboardEntry } from '@/types';

export class UserRepository {
  /** Find user by email, with passwordHash included (for auth). */
  async findByEmailWithPassword(email: string): Promise<IUserDocument | null> {
    await connectDB();
    return User.findOne({ email: email.toLowerCase() }).select('+passwordHash').lean<IUserDocument>();
  }

  /** Find user by ID (no passwordHash). */
  async findById(id: string): Promise<IUserDocument | null> {
    await connectDB();
    return User.findById(id).lean<IUserDocument>();
  }

  /** Find user by email (no passwordHash). */
  async findByEmail(email: string): Promise<IUserDocument | null> {
    await connectDB();
    return User.findOne({ email: email.toLowerCase() }).lean<IUserDocument>();
  }

  /** Find user by username (no passwordHash). */
  async findByUsername(username: string): Promise<IUserDocument | null> {
    await connectDB();
    return User.findOne({ username }).lean<IUserDocument>();
  }

  /** Create a new user. */
  async create(data: {
    username: string;
    email: string;
    passwordHash: string;
  }): Promise<IUserDocument> {
    await connectDB();
    const user = await User.create(data);
    return user.toObject() as IUserDocument;
  }

  async addSolvedChallenge(
    userId: string,
    challengeId: string,
    points: number,
  ): Promise<IUserDocument | null> {
    await connectDB();
    return User.findOneAndUpdate(
      { 
        _id: userId, 
        solvedChallenges: { $ne: new Types.ObjectId(challengeId) } 
      },
      {
        $inc: { score: points },
        $push: { solvedChallenges: new Types.ObjectId(challengeId) },
      },
      { new: true, lean: true },
    ).lean<IUserDocument>();
  }

  /**
   * Get scoreboard — returns only id, username, score, solvedCount.
   * Uses projection to avoid loading full documents.
   */
  async getScoreboard(limit = 100): Promise<ScoreboardEntry[]> {
    await connectDB();

    interface ScoreboardUser {
      _id: Types.ObjectId;
      username: string;
      score: number;
      solvedChallenges: Types.ObjectId[];
    }

    const users = await User.find({})
      .select('username score solvedChallenges')
      .sort({ score: -1, createdAt: 1 })
      .limit(limit)
      .lean<ScoreboardUser[]>();

    return users.map((u, index) => ({
      rank: index + 1,
      id: u._id.toString(),
      username: u.username,
      score: u.score,
      solvedCount: u.solvedChallenges.length,
    }));
  }
}

export const userRepository = new UserRepository();
