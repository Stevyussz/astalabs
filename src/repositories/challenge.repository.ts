// src/repositories/challenge.repository.ts
import Challenge, { IChallengeDocument } from '@/models/Challenge';
import { connectDB } from '@/lib/db';
import { ChallengeFilter, PaginatedResult, PublicChallenge } from '@/types';

// Projection that EXCLUDES flagHash — safe for client consumption
const PUBLIC_PROJECTION = '-flagHash';

export class ChallengeRepository {
  /** List challenges with filtering and pagination. Never exposes flagHash. */
  async findAll(filter: ChallengeFilter): Promise<PaginatedResult<PublicChallenge>> {
    await connectDB();

    const { category, difficulty, search, page = 1, limit = 20 } = filter;
    const query: Record<string, unknown> = { isActive: true };

    if (category) {
       query.category = category;
    } else {
       // Secara default, sembunyikan challenge yang masuk ke dalam Boxground (category berawalan 'box-')
       query.category = { $not: /^box-/ };
    }
    
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Challenge.find(query)
        .select(PUBLIC_PROJECTION)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean<IChallengeDocument[]>(),
      Challenge.countDocuments(query),
    ]);

    return {
      items: items.map(this.toPublicChallenge),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /** Get single challenge by ID. Never exposes flagHash. */
  async findById(id: string): Promise<PublicChallenge | null> {
    await connectDB();
    const doc = await Challenge.findById(id)
      .select(PUBLIC_PROJECTION)
      .lean<IChallengeDocument>();
    if (!doc) return null;
    return this.toPublicChallenge(doc);
  }

  /**
   * Get challenge with flagHash — INTERNAL USE ONLY.
   * Only called by submission service for flag comparison.
   */
  async findByIdWithFlag(
    id: string,
  ): Promise<Pick<IChallengeDocument, 'flagHash' | 'points' | 'isActive'> & { _id: unknown } | null> {
    await connectDB();
    return Challenge.findById(id)
      .select('+flagHash points isActive')
      .lean<Pick<IChallengeDocument, 'flagHash' | 'points' | 'isActive'> & { _id: unknown }>();
  }

  /** Increment solve count atomically. */
  async incrementSolveCount(id: string): Promise<void> {
    await connectDB();
    await Challenge.findByIdAndUpdate(id, { $inc: { solveCount: 1 } });
  }

  /** Create a new challenge (admin/seeder use). */
  async create(data: {
    title: string;
    category: string;
    difficulty: string;
    description: string;
    flagHash: string;
    points: number;
    hints?: { content: string; cost: number }[];
    isActive?: boolean;
  }): Promise<IChallengeDocument> {
    await connectDB();
    const challenge = await Challenge.create(data);
    return challenge.toObject() as IChallengeDocument;
  }

  private toPublicChallenge(doc: IChallengeDocument & { _id: unknown }): PublicChallenge {
    return {
      id: String(doc._id),
      title: doc.title,
      category: doc.category,
      difficulty: doc.difficulty,
      description: doc.description,
      points: doc.points,
      hints: doc.hints,
      isActive: doc.isActive,
      solveCount: doc.solveCount,
      createdAt: doc.createdAt,
    };
  }
}

export const challengeRepository = new ChallengeRepository();
