import dbclient from "../prismaClient";
import type { Response, NextFunction } from "express";
import { AuthRequest } from "../types/express";

import {
  NotFoundError,
  UnauthorisedError,
  ValidationError,
} from "../helpers/error";

/**
 * @description Get tasks query
 * @route GET tasks?
 * @access Private
 * @role User
 */
export const getTasks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorisedError("No user id");
    }
    const query = req.query;
    const tasks = await dbclient.task.findMany({ where: query });
    res.json({ tasks: tasks });
  } catch (err) {
    next(err);
  }
};

/**
 * @description Get task
 * @route GET tasks/:id
 * @access Private
 * @role User
 */
export const getTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorisedError("No user id");
    }
    const id = req.params.id;
    if (!id) {
      throw new ValidationError("No id found");
    }
    const task = await dbclient.task.findFirst({
      where: { id: id, userId: userId },
    });
    if (!task) {
      throw new NotFoundError("Task not found");
    }
    res.json({ task });
  } catch (err) {
    next(err);
  }
};

/**
 * @description Create task
 * @route POST tasks
 * @access Private
 * @role User
 */
export const createTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorisedError("No user id");
    }
    const taskData = req.body;
    if (!taskData) {
      throw new ValidationError("No task body");
    }
    const task = await dbclient.task.create({ data: taskData });
    res.json({ task });
  } catch (err) {
    next(err);
  }
};

/**
 * @description Update task
 * @route PATCH tasks/:id
 * @access Private
 * @role User
 */
export const updateTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorisedError("No user id");
    }
    const body = req.body;
    if (!body) {
      throw new ValidationError("Body required");
    }
    const { id } = req.params;
    if (!id) {
      throw new ValidationError("Id required");
    }
    const foundTask = await dbclient.task.findFirst({
      where: { id: id, userId: userId },
    });
    if (!foundTask) {
      throw new NotFoundError("Task not found");
    }

    const task = await dbclient.task.update({
      where: { id: id, userId: userId },
      data: body,
    });

    res.json(task);
  } catch (err) {
    next(err);
  }
};

/**
 * @description Update task
 * @route DELETE tasks/:id
 * @access Private
 */
export const deleteTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorisedError("No user id");
    }
    const { id } = req.params;
    if (!id) {
      throw new ValidationError("Id required");
    }
    const deletedTask = await dbclient.task.delete({
      where: { id: id, userId: userId },
    });
    if (!deleteTask) {
      throw new NotFoundError("Task not found");
    }
    return res.json({
      message: `Task '${deletedTask.title}'  with id ${deletedTask.id} deleted`,
    });
  } catch (err) {
    next(err);
  }
};
