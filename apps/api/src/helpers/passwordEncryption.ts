import { hashSync, compareSync } from "bcrypt";

export const encryptPassword = (password: string) => {
  return hashSync(password, 12);
};

export const comparePasswords = (hashPassword: string, password: string) => {
  return compareSync(password, hashPassword);
};
