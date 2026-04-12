// src/models/User.ts
import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from '@/types';

export interface IUserDocument extends Omit<IUser, '_id'>, Document {}

const userSchema = new Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
      match: [/^[a-zA-Z0-9_-]+$/, 'Username contains invalid characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
      select: false, // Never expose in queries by default
    },
    score: {
      type: Number,
      default: 0,
      min: 0,
    },
    solvedChallenges: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Challenge' }],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Compound index for efficient scoreboard pagination
userSchema.index({ score: -1, createdAt: 1 });

// Email is already set to lowercase: true in schema definition above

const User: Model<IUserDocument> =
  mongoose.models.User ?? mongoose.model<IUserDocument>('User', userSchema);

export default User;
