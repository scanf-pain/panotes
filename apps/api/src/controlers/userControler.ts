import { UserBasic } from "../types/user";
import type { NextFunction, Request, Response } from "express";
import { encryptPassword } from "../helpers/passwordEncryption";
import { UserEdit, User } from "../types/user";
import dbclient from "../prismaClient";
import {
  NotFoundError,
  ValidationError,
  ConflictError,
} from "../helpers/error";

/**
 * @description Get all users
 * @route GET user
 * @access Private
 */
export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users: UserBasic[] = await dbclient.user.findMany();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

/**
 * @description Get all users
 * @route GET user/:id
 * @access Private
 */
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new ValidationError("Id required");
    }

    const foundUser = await dbclient.user.findFirst({ where: { id: id } });

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
 * @desc Register
 * @route PUT user
 * @access Public
 */
export const createUser = async (
  req: Request<object, object, UserEdit>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      throw new ValidationError("All fields required");
    }

    const existingUser = await dbclient.user.findFirst({
      where: { email: email },
    });

    if (existingUser) {
      throw new ConflictError("User already exist");
    }

    const hashedPassword = encryptPassword(password);

    const createdUser: User = await dbclient.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
        role: "user",
      },
    });

    return res.json({ createdUser });
  } catch (err) {
    next(err);
  }
};

/**
 * @description Update
 * @route PATCH user
 * @access Private
 */
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new ValidationError("Id required");
    }
    const body = req.body;
    if (!body) {
      throw new ValidationError("Body required");
    }

    const foundUser = await dbclient.user.findFirst({ where: { id: id } });

    if (!foundUser) {
      throw new NotFoundError("User not foun");
    }

    const user: UserBasic = foundUser;

    res.json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * @description Delete user
 * @route DELETE /user
 * @access Private
 */
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new ValidationError("Id required");
    }
    const user = await dbclient.user.findFirst({ where: { id: id } });
    if (!user) {
      return res.sendStatus(200);
    }
    const [deletedUser] = await dbclient.$transaction([
      dbclient.user.delete({ where: { id: id } }),
      dbclient.task.deleteMany({ where: { userId: id } }),
      dbclient.note.deleteMany({ where: { userId: id } }),
      dbclient.category.deleteMany({ where: { userId: id } }),
    ]);
    return res.json({
      message: `User account ${deletedUser.name} deleted`,
    });
  } catch (err) {
    next(err);
  }
};
