import { NextFunction, Response } from "express";
import { UnauthorisedError, ForbiddenError } from "../helpers/error";
import { verifyAccessToken } from "../helpers/authToken";
import { AuthRequest } from "../types/express";
import dbclient from "../prismaClient";

const authentify = (req: AuthRequest, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new UnauthorisedError("Bad authorization header");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new UnauthorisedError("Auth token is missing");
  }
  (async () => {
    try {
      const decoded = await verifyAccessToken(token);
      if (decoded === null) {
        throw new ForbiddenError("Bad auth token");
      }
      const user = await dbclient.user.findFirst({ where: { id: decoded.id } });
      if (!user) {
        throw new ForbiddenError("User not registered");
      }

      req.user = { id: user.id, role: user.role };

      next();
    } catch (error) {
      next(error);
    }
  })();
};

export default authentify;
