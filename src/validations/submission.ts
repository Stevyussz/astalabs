// src/validations/submission.ts
import { z } from 'zod';

export const submitFlagSchema = z.object({
  challengeId: z.string().min(1, 'Challenge ID is required').regex(/^[a-f\d]{24}$/i, 'Invalid challenge ID'),
  flag: z
    .string()
    .min(1, 'Flag is required')
    .max(500, 'Flag is too long')
    .transform((val) => val.trim()),
});

export type SubmitFlagInput = z.infer<typeof submitFlagSchema>;
