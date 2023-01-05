import jwt from "jsonwebtoken";

export const signToken = async (data) => {
  return jwt.sign(data, process.env.JWT_SECRET)
}

export const verifyToken = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}