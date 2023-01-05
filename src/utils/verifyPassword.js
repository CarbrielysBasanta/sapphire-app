import { hash, verify } from "argon2";

export const hashPassword = async (password) => {
  return await hash(password)
}

export const verifyPassword = async (hash, password) => {
  return await verify(hash, password)
}