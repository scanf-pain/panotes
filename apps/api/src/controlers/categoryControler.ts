import dbclient from "../prismaClient";
import type { Response, NextFunction } from "express";
import { AuthRequest } from "../types/express";

import {
  NotFoundError,
  UnauthorisedError,
  ValidationError,
} from "../helpers/error";

/**
 * @description Get categories query
 * @route GET categories?
 * @access Private
 * @role User
 */
export const getCategories = async (
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
    const categories = await dbclient.category.findMany({ where: query });
    res.json({ categories: categories });
  } catch (err) {
    next(err);
  }
};

/**
 * @description Get category
 * @route GET categories/:id
 * @access Private
 * @role User
 */
export const getCategory = async (
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
    const category = await dbclient.category.findFirst({
      where: { id: id, userId: userId },
    });
    if (!category) {
      throw new NotFoundError("Category not found");
    }
    res.json({ category });
  } catch (err) {
    next(err);
  }
};

/**
 * @description Create category
 * @route POST categories
 * @access Private
 * @role User
 */
export const createCategory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorisedError("No user id");
    }
    const categoryData = req.body;
    if (!categoryData) {
      throw new ValidationError("No category body");
    }
    const category = await dbclient.category.create({ data: categoryData });
    res.json({ category });
  } catch (err) {
    next(err);
  }
};

/**
 * @description Update category
 * @route PATCH categories/:id
 * @access Private
 * @role User
 */
export const updateCategory = async (
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
    const foundCategory = await dbclient.category.findFirst({
      where: { id: id, userId: userId },
    });
    if (!foundCategory) {
      throw new NotFoundError("Category not found");
    }

    const category = await dbclient.category.update({
      where: { id: id, userId: userId },
      data: body,
    });

    res.json(category);
  } catch (err) {
    next(err);
  }
};

/**
 * @description Update category
 * @route DELETE categories/:id
 * @access Private
 */
export const deleteCategory = async (
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
    const deletedCategory = await dbclient.category.delete({
      where: { id: id, userId: userId },
    });
    if (!deleteCategory) {
      throw new NotFoundError("Category not found");
    }
    return res.json({
      message: `Category '${deletedCategory.name}'  with id ${deletedCategory.id} deleted`,
    });
  } catch (err) {
    next(err);
  }
};
