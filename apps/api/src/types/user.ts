import { User as prismaUser, Role as prismaRole } from "@prisma/client";

export type UserRole = prismaRole;

export type User = Omit<prismaUser, "password">;

export type UserBasic = Omit<User, "createdAt" | "updatedAt" | "role">;

export type UserLogin = { email: string; password: string };

export type UserEdit = Omit<prismaUser, "createdAt" | "updatedAt" | "id">;
