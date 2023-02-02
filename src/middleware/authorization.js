import { rule } from "graphql-shield";
import { verifyToken } from "../utils/auth.js";

export const isAuthorized = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  const { authorization } = ctx;
  if (!authorization) { return 'you-need-authorization' }
  const { userId } = await verifyToken(authorization)
  return !!userId
})

export const isUser = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  const { authorization } = ctx;
  const { userId, role } = await verifyToken(authorization)
  if (role !== "User") { return 'user-role-not-authorized' }
  return !!userId
})

export const isAdmin = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  const { authorization } = ctx;
  const { userId, role } = await verifyToken(authorization)
  if (role !== "Admin") { return 'user-role-not-authorized' }
  return !!userId
})