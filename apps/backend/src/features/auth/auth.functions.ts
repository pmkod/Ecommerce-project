import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import {
  ACCESS_TOKEN_DURATION_IN_MS,
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_DURATION_IN_MS,
  REFRESH_TOKEN_SECRET_KEY,
} from "../../core/configs/token.config";

const hashPassword = async (plainPassword: string) => {
  return await bcrypt.hash(plainPassword, 10);
};

const comparePlainPasswordToHAsh = async (
  plainPassword: string,
  hashPassword: string
) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};

const generateUserVerificationToken = () => {
  return nanoid(400);
};

type GenerateAccessToken = {
  userId: string;
  refreshTokenId: string;
};
const generateAccessToken = ({
  userId,
  refreshTokenId,
}: GenerateAccessToken) => {
  return jwt.sign({ userId, refreshTokenId }, ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: `${ACCESS_TOKEN_DURATION_IN_MS}ms`,
  });
};

type GenerateRefreshToken = {
  userId: string;
  refreshTokenId: string;
};
const generateRefreshToken = ({
  userId,
  refreshTokenId,
}: GenerateRefreshToken) => {
  return jwt.sign({ userId, refreshTokenId }, REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: `${REFRESH_TOKEN_DURATION_IN_MS}ms`,
  });
};

type GenerateAccessAndRefreshToken = {
  userId: string;
  refreshTokenId: string;
};
const generateAccessAndRefreshToken = ({
  userId,
  refreshTokenId,
}: GenerateAccessAndRefreshToken) => {
  const refreshToken = generateRefreshToken({ userId, refreshTokenId });
  const accessToken = generateAccessToken({ userId, refreshTokenId });
  return { accessToken, refreshToken };
};

export {
  hashPassword,
  comparePlainPasswordToHAsh,
  generateUserVerificationToken,
  generateAccessToken,
  generateRefreshToken,
  generateAccessAndRefreshToken,
};
