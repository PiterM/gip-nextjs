import { compare } from "bcryptjs";

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => await compare(password, hashedPassword);
