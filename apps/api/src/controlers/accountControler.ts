import { User, UserBasic, UserEdit } from "../types/user";
import type { NextFunction, Response } from "express";
import {
  InternalError,
  NotFoundError,
  ValidationError,
} from "../helpers/error";
import dbclient from "../prismaClient";
import { AuthRequest } from "../types/express";

/**
 * @description Get all users
 * @route GET auth/profile
 * @access Private
 */
export const getSelf = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user.id) {
      throw new InternalError("User atribute in request is missing");
    }

    const foundUser = await dbclient.user.findFirst({
      where: { id: req.user.id },
    });

    if (!foundUser) {
      throw new NotFoundError("User not found");
    }

    const user: UserBasic = foundUser;

    res.json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * @description Update
 * @route PATCH auth/profile
 * @access Private
 */
export const updateSelf = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user.id) {
      throw new InternalError("User atribute in request is missing");
    }

    const body: UserEdit = req.body;
    if (!body) {
      throw new ValidationError("Body required");
    }

    const foundUser = await dbclient.user.findFirst({
      where: { id: req.user.id },
    });

    if (!foundUser) {
      throw new NotFoundError("User not foun");
    }

    const updated: User = await dbclient.user.update({
      where: { id: req.user.id },
      data: { ...body, updatedAt: new Date() },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

/**
 * @description Delete user
 * @route DELETE auth/profile
 * @access Private
 */
export const deletSelf = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?.id) {
      throw new InternalError("User atribute in request is missing");
    }

    const user = await dbclient.user.findFirst({ where: { id: req.user.id } });
    if (!user) {
      return res.sendStatus(200);
    }
    const [deletedUser] = await dbclient.$transaction([
      dbclient.user.delete({ where: { id: req.user.id } }),
      dbclient.task.deleteMany({ where: { userId: req.user.id } }),
      dbclient.note.deleteMany({ where: { userId: req.user.id } }),
      dbclient.category.deleteMany({ where: { userId: req.user.id } }),
    ]);
    return res.json({
      message: `User account ${deletedUser.name} deleted`,
    });
  } catch (err) {
    next(err);
  }
};
