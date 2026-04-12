// src/models/Challenge.ts
import mongoose, { Schema, Document, Model } from 'mongoose';
import { IChallenge, ChallengeCategory, ChallengeDifficulty } from '@/types';

export interface IChallengeDocument extends Omit<IChallenge, '_id'>, Document {}

const hintSchema = new Schema(
  {
    content: { type: String, required: true },
    cost: { type: Number, required: true, min: 0, default: 0 },
  },
  { _id: false },
);

const challengeSchema = new Schema<IChallengeDocument>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['web', 'crypto', 'forensics', 'pwn', 'reverse', 'misc'] satisfies ChallengeCategory[],
      index: true,
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty is required'],
      enum: ['easy', 'medium', 'hard', 'insane'] satisfies ChallengeDifficulty[],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: 10,
      maxlength: 5000,
    },
    flagHash: {
      type: String,
      required: [true, 'Flag hash is required'],
      select: false, // CRITICAL: Never expose in API responses
    },
    points: {
      type: Number,
      required: [true, 'Points are required'],
      min: 1,
      max: 10000,
    },
    hints: {
      type: [hintSchema],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    solveCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Compound index for filtered list queries
challengeSchema.index({ category: 1, difficulty: 1, isActive: 1 });
// Text search index
challengeSchema.index({ title: 'text', description: 'text' });

const Challenge: Model<IChallengeDocument> =
  mongoose.models.Challenge ?? mongoose.model<IChallengeDocument>('Challenge', challengeSchema);

export default Challenge;
