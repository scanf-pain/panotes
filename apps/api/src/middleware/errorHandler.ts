import { NextFunction, Request, Response } from "express";
import {
  ValidationError,
  ConflictError,
  EnvVariableUndefined,
  ForbiddenError,
  InternalError,
  NoContentError,
  NotFoundError,
  UnauthorisedError,
} from "../helpers/error";

// TODO redo error

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === "development") console.error(`Error: ${error.message}`);

  if (error instanceof NoContentError) {
    return res.status(204).json({ message: "No Content" });
  }
  if (error instanceof ValidationError) {
    return res.status(400).json({ message: "Invalid request" });
  }
  if (error instanceof ConflictError) {
    return res.status(400).json({ message: "Conflict Error" });
  }
  if (error instanceof UnauthorisedError) {
    return res.status(401).json({ message: "Unauthorised" });
  }
  if (error instanceof NotFoundError) {
    return res.status(404).json({ message: "Not Found" });
  }
  if (error instanceof ForbiddenError) {
    return res.status(403).json({ message: "Forbidden" });
  }
  if (error instanceof EnvVariableUndefined) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  if (error instanceof InternalError) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
