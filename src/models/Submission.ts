// src/models/Submission.ts
import mongoose, { Schema, Document, Model } from 'mongoose';
import { ISubmission } from '@/types';

export interface ISubmissionDocument extends Omit<ISubmission, '_id'>, Document {}

const submissionSchema = new Schema<ISubmissionDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    challengeId: {
      type: Schema.Types.ObjectId,
      ref: 'Challenge',
      required: [true, 'Challenge ID is required'],
      index: true,
    },
    submittedFlag: {
      type: String,
      required: [true, 'Submitted flag is required'],
      maxlength: 500,
    },
    isCorrect: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  },
);

// Compound index for duplicate solve prevention — fastest lookup
submissionSchema.index({ userId: 1, challengeId: 1 });

// Index for per-user submission history
submissionSchema.index({ userId: 1, createdAt: -1 });

const Submission: Model<ISubmissionDocument> =
  mongoose.models.Submission ??
  mongoose.model<ISubmissionDocument>('Submission', submissionSchema);

export default Submission;
