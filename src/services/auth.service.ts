// src/services/auth.service.ts
import bcrypt from 'bcryptjs';
import { userRepository } from '@/repositories/user.repository';
import { registerSchema, loginSchema, RegisterInput, LoginInput } from '@/validations/auth';
import { PublicUser, SessionUser } from '@/types';

const BCRYPT_SALT_ROUNDS = 12;

export class AuthService {
  /**
   * Register a new user.
   * Validates input → checks duplicates → hashes password → creates user.
   */
  async register(input: RegisterInput): Promise<PublicUser> {
    const validatedInput = registerSchema.parse(input);

    // Check for duplicate email or username
    const [existingEmail, existingUsername] = await Promise.all([
      userRepository.findByEmail(validatedInput.email),
      userRepository.findByUsername(validatedInput.username),
    ]);

    if (existingEmail) {
      throw new Error('EMAIL_TAKEN');
    }
    if (existingUsername) {
      throw new Error('USERNAME_TAKEN');
    }

    const passwordHash = await bcrypt.hash(validatedInput.password, BCRYPT_SALT_ROUNDS);

    const user = await userRepository.create({
      username: validatedInput.username,
      email: validatedInput.email,
      passwordHash,
    });

    return this.toPublicUser(user);
  }

  /**
   * Verify credentials for NextAuth CredentialsProvider.
   * Returns a SessionUser if valid, null otherwise.
   */
  async verifyCredentials(input: LoginInput): Promise<SessionUser | null> {
    const validatedInput = loginSchema.parse(input);

    const user = await userRepository.findByEmailWithPassword(validatedInput.email);
    if (!user) return null;

    const isValid = await bcrypt.compare(validatedInput.password, user.passwordHash);
    if (!isValid) return null;

    return {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      score: user.score,
      createdAt: user.createdAt.toISOString(),
    };
  }

  private toPublicUser(user: {
    _id: { toString: () => string };
    username: string;
    email: string;
    score: number;
    solvedChallenges: unknown[];
    createdAt: Date;
  }): PublicUser {
    return {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      score: user.score,
      solvedChallenges: user.solvedChallenges.map(String),
      createdAt: user.createdAt,
    };
  }
}

export const authService = new AuthService();
