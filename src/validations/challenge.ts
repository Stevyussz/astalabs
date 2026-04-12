// src/validations/challenge.ts
import { z } from 'zod';

const CATEGORIES = ['web', 'crypto', 'forensics', 'pwn', 'reverse', 'misc'] as const;
const DIFFICULTIES = ['easy', 'medium', 'hard', 'insane'] as const;

export const createChallengeSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  category: z.enum(CATEGORIES, { error: 'Invalid category' }),
  difficulty: z.enum(DIFFICULTIES, { error: 'Invalid difficulty' }),
  description: z.string().min(10, 'Description must be at least 10 characters').max(5000),
  flag: z.string().min(1, 'Flag is required'),
  points: z.number().int().min(1).max(10000),
  hints: z
    .array(
      z.object({
        content: z.string().min(1),
        cost: z.number().int().min(0),
      }),
    )
    .optional()
    .default([]),
  isActive: z.boolean().optional().default(true),
});

export const filterChallengeSchema = z.object({
  category: z.enum(CATEGORIES).optional(),
  difficulty: z.enum(DIFFICULTIES).optional(),
  search: z.string().max(100).optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(20),
});

export type CreateChallengeInput = z.infer<typeof createChallengeSchema>;
export type FilterChallengeInput = z.infer<typeof filterChallengeSchema>;
