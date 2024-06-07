import { Request } from "express";
import { UserRole } from "./user";

export interface AuthRequest extends Request {
  user: { id: string; role: UserRole };
}
