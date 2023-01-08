import { rule } from "graphql-shield";
import { verifyToken } from "../utils/auth.js";

export const isAuthorized = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  const { authorization } = ctx;
  if (!authorization) { return false }
  const { userId } = await verifyToken(authorization)
  console.log(userId);
  return !!userId
})