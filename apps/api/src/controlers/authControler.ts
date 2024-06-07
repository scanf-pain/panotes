import type { NextFunction, Request, Response } from "express";
import { UserLogin } from "../types/user";
import {
  ForbiddenError,
  NotFoundError,
  UnauthorisedError,
  ValidationError,
} from "../helpers/error";

import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../helpers/authToken";
import dbclient from "../prismaClient";
import { comparePasswords } from "../helpers/passwordEncryption";

/**
 * @desc Login
 * @route POST /login
 * @access Public
 */
export const login = async (
  req: Request<object, object, UserLogin>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ValidationError("All fields required");
    }
    const foundUser = await dbclient.user.findFirst({
      where: { email: email },
    });
    if (!foundUser) {
      throw new NotFoundError("Email not registered");
    }

    const match = comparePasswords(foundUser.password, password);

    if (!match) {
      throw new UnauthorisedError("Password do not match");
    }

    const accessToken = await signAccessToken(foundUser.id, foundUser.role);

    const refreshToken = await signRefreshToken(foundUser.id);

    res.cookie("jwt", refreshToken, {
      httpOnly: true, // only accessible by webserver
      secure: true, // https
      sameSite: "none", // cross origin cookie
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Resfresh
 * @route GET /auth/refresh
 * @access Public
 */
export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      throw new UnauthorisedError("JWT cookie is missing");
    }

    const refreshToken = cookies.jwt;

    const userData = await verifyRefreshToken(refreshToken);
    if (userData === null) {
      throw new ForbiddenError("Bad token");
    }

    const foundUser = await dbclient.user.findFirst({
      where: { id: userData.id },
    });
    if (!foundUser) {
      throw new NotFoundError("Email not registered");
    }

    const newAccessToken = await signAccessToken(foundUser.id, foundUser.role);

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Logout
 * @route POST /auth/logout
 * @access Public
 */
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      res.sendStatus(204); // No Content, everything is fine
    }
    res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" });
    res.json({ message: "Cookie cleared" });
  } catch (err) {
    next(err);
  }
};
