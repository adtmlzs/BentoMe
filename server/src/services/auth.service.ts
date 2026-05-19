import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel, UserDocument } from '../models/User';
import { ProfileModel } from '../models/Profile';
import { env } from '../config/env';
import type { RegisterInput, LoginInput } from '../validators/auth.schema';
import type { AuthPayload } from '../middleware/auth';

function generateToken(user: UserDocument): string {
  const payload: AuthPayload = {
    userId: user._id.toString(),
    username: user.username,
  };
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}

export async function registerUser(input: RegisterInput) {
  const existingEmail = await UserModel.findOne({ email: input.email });
  if (existingEmail) {
    const error = new Error('Email already in use') as Error & { statusCode: number };
    error.statusCode = 409;
    throw error;
  }

  const existingUsername = await UserModel.findOne({ username: input.username });
  if (existingUsername) {
    const error = new Error('Username already taken') as Error & { statusCode: number };
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(input.password, 12);

  const user = await UserModel.create({
    email: input.email,
    passwordHash,
    username: input.username,
    displayName: input.displayName,
  });

  // Create an empty profile for the new user
  await ProfileModel.create({
    userId: user._id.toString(),
    username: user.username,
    displayName: user.displayName,
  });

  const token = generateToken(user);

  return {
    user: {
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      displayName: user.displayName,
      plan: user.plan,
      isVerified: user.isVerified,
    },
    token,
  };
}

export async function loginUser(input: LoginInput) {
  const user = await UserModel.findOne({ email: input.email }).select('+passwordHash');

  if (!user) {
    const error = new Error('Invalid credentials') as Error & { statusCode: number };
    error.statusCode = 401;
    throw error;
  }

  const isValidPassword = await bcrypt.compare(input.password, user.passwordHash);

  if (!isValidPassword) {
    const error = new Error('Invalid credentials') as Error & { statusCode: number };
    error.statusCode = 401;
    throw error;
  }

  user.lastLoginAt = new Date();
  await user.save();

  const token = generateToken(user);

  return {
    user: {
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      displayName: user.displayName,
      plan: user.plan,
      isVerified: user.isVerified,
    },
    token,
  };
}

export async function getCurrentUser(userId: string) {
  const user = await UserModel.findById(userId);

  if (!user) {
    const error = new Error('User not found') as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return {
    id: user._id.toString(),
    email: user.email,
    username: user.username,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    plan: user.plan,
    isVerified: user.isVerified,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}
