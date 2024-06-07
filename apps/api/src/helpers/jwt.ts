import * as jwt from "jsonwebtoken";

export const signJwt = (
  payload: object,
  secret: string,
  options: jwt.SignOptions = {}
) => {
  const privateKey = Buffer.from(secret, "base64").toString("ascii");
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = <T>(token: string, secret: string): T | null => {
  try {
    const publicKey = Buffer.from(secret, "base64").toString("ascii");
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    return null;
  }
};
