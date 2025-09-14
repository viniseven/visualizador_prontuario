import bcrypt from "bcrypt";

const saltRounds = 10;

export async function hashPassword(passwordUser: string) {
  return await bcrypt.hash(passwordUser, saltRounds);
}
