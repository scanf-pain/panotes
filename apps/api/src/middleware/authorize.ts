import { NextFunction, Response } from "express";
import { UserRole } from "../types/user";
import { UnauthorisedError } from "../helpers/error";
import { AuthRequest } from "../types/express";

const authorize = (roles: UserRole[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (roles.length === 0) {
      next();
    }

    if (!req.user) {
      throw new UnauthorisedError("User not authorised");
    }

    const userRole = req.user.role;

    if (!roles.includes(userRole)) {
      throw new UnauthorisedError(
        "Your role is not allowed to access this route"
      );
    }

    next();
  };
};

export default authorize;
