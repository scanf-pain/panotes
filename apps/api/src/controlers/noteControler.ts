import dbclient from "../prismaClient";
import type { Response, NextFunction } from "express";
import {
  NotFoundError,
  UnauthorisedError,
  ValidationError,
} from "../helpers/error";
import { AuthRequest } from "../types/express";
/**
 * @description Get notes query
 * @route GET auth/notes?
 * @access Private
 * @role User
 */
export const getNotes = async (
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
    const notes = await dbclient.note.findMany({ where: query });
    res.json({ notes: notes });
  } catch (err) {
    next(err);
  }
};

/**
 * @description Get note
 * @route GET auth/notes/:id
 * @access Private
 * @role User
 */
export const getNote = async (
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
    const note = await dbclient.note.findFirst({
      where: { id: id, userId: userId },
    });
    if (!note) {
      throw new NotFoundError("Note not found");
    }
    res.json({ note });
  } catch (err) {
    next(err);
  }
};

/**
 * @description Create note
 * @route POST auth/notes
 * @access Private
 * @role User
 */
export const createNote = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorisedError("No user id");
    }
    const noteData = req.body;
    if (!noteData) {
      throw new ValidationError("No note body");
    }
    const task = await dbclient.task.create({ data: noteData });
    res.json({ task });
  } catch (err) {
    next(err);
  }
};

/**
 * @description Update note
 * @route PATCH auth/notes/:id
 * @access Private
 * @role User
 */
export const updateNote = async (
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
    const foundNote = await dbclient.note.findFirst({
      where: { id: id, userId: userId },
    });
    if (!foundNote) {
      throw new NotFoundError("Note not found");
    }

    const note = await dbclient.note.update({
      where: { id: id, userId: userId },
      data: body,
    });

    res.json(note);
  } catch (err) {
    next(err);
  }
};

/**
 * @description Update note
 * @route DELETE auth/notes/:id
 * @access Private
 * @role User
 */
export const deleteNote = async (
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
    const deletedNote = await dbclient.note.delete({
      where: { id: id, userId: userId },
    });
    if (!deleteNote) {
      throw new NotFoundError("Note not found");
    }
    return res.json({
      message: `Note '${deletedNote.title}'  with id ${deletedNote.id} deleted`,
    });
  } catch (err) {
    next(err);
  }
};
