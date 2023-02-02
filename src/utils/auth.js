import jwt from "jsonwebtoken";

export const signToken = async (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, {expiresIn: "1h"})
}

export const verifyToken = async (token) => {
  const verify = jwt.verify(token, process.env.JWT_SECRET)
  return verify
}