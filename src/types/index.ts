// src/types/index.ts
import { Types } from 'mongoose';

// ─── Enums ──────────────────────────────────────────────────────────────────

export type ChallengeCategory =
  | 'web'
  | 'crypto'
  | 'forensics'
  | 'pwn'
  | 'reverse'
  | 'misc';

export type ChallengeDifficulty = 'easy' | 'medium' | 'hard' | 'insane';

// ─── Domain Interfaces ───────────────────────────────────────────────────────

export interface IUser {
  _id: Types.ObjectId;
  username: string;
  email: string;
  passwordHash: string;
  score: number;
  solvedChallenges: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IHint {
  content: string;
  cost: number;
}

export interface IChallenge {
  _id: Types.ObjectId;
  title: string;
  category: ChallengeCategory;
  difficulty: ChallengeDifficulty;
  description: string;
  flagHash: string;
  points: number;
  hints: IHint[];
  isActive: boolean;
  solveCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubmission {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  challengeId: Types.ObjectId;
  submittedFlag: string;
  isCorrect: boolean;
  createdAt: Date;
}

// ─── API / View DTOs (safe to send to client) ───────────────────────────────

export interface PublicUser {
  id: string;
  username: string;
  email: string;
  score: number;
  solvedChallenges: string[];
  createdAt: Date;
}

export interface PublicChallenge {
  id: string;
  title: string;
  category: ChallengeCategory;
  difficulty: ChallengeDifficulty;
  description: string;
  points: number;
  hints: IHint[];
  isActive: boolean;
  solveCount: number;
  isSolved?: boolean;
  createdAt: Date;
}

export interface ScoreboardEntry {
  rank: number;
  id: string;
  username: string;
  score: number;
  solvedCount: number;
}

export interface SubmissionResult {
  isCorrect: boolean;
  message: string;
  pointsAwarded?: number;
}

// ─── Auth / Session ──────────────────────────────────────────────────────────

export interface SessionUser {
  id: string;
  username: string;
  email: string;
  score: number;
  createdAt: string;
}

// ─── API Response Wrapper ────────────────────────────────────────────────────

export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  details?: Record<string, string[]>;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ─── Filter Types ────────────────────────────────────────────────────────────

export interface ChallengeFilter {
  category?: ChallengeCategory;
  difficulty?: ChallengeDifficulty;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
