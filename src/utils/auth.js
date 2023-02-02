import jwt from "jsonwebtoken";

export const signToken = async (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, {expiresIn: "5m"})
}

export const verifyToken = async (token) => {
  const verify = jwt.verify(token, process.env.JWT_SECRET)
  console.log('VEF', verify);
  return verify
}