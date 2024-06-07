import { signJwt, verifyJwt } from "../helpers/jwt";

import * as dotenv from "dotenv";

dotenv.config();

const {
  ACCESS_TOKEN_PRIVATE_KEY,
  ACCESS_TOKEN_PUBLIC_KEY,
  REFRESH_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PUBLIC_KEY,
} = process.env;

const { ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION } = process.env;

export const signAccessToken = async (userId: string, userRole: string) => {
  // Sign the access token
  const accessToken = signJwt(
    { id: userId, role: userRole },
    ACCESS_TOKEN_PRIVATE_KEY,
    {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    }
  );
  // Return access token
  return accessToken;
};

export const signRefreshToken = async (userId: string) => {
  // Sign the access token
  const refreshToken = signJwt({ id: userId }, REFRESH_TOKEN_PRIVATE_KEY, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });
  // Return access token
  return refreshToken;
};

export const verifyRefreshToken = async (refreshToken: string) => {
  const decoded = verifyJwt<{ id: string }>(
    refreshToken,
    REFRESH_TOKEN_PUBLIC_KEY
  );
  return decoded;
};

export const verifyAccessToken = async (accessToken: string) => {
  const decoded = verifyJwt<{ id: string; role: string }>(
    accessToken,
    ACCESS_TOKEN_PUBLIC_KEY
  );
  return decoded;
};
