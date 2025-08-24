import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import {
  ACCESS_TOKEN_DURATION_IN_MS,
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_DURATION_IN_MS,
  REFRESH_TOKEN_SECRET_KEY,
} from "../../../core/configs/token.config";

//
//
//
//
//
//
//
//
//
//

const generateUserVerificationToken = () => {
  return nanoid(400);
};

//
//
//
//
//
//
//
//
//
//

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

const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);
};

//
//
//
//
//
//
//
//
//
//

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

const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET_KEY);
};

//
//
//
//
//
//
//
//
//

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
  generateUserVerificationToken,
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generateAccessAndRefreshToken,
};
