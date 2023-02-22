import { rule } from "graphql-shield";
import { verifyToken } from "../utils/auth.js";

export const isAuthorized = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  try {
    const { authorization } = ctx;
    if (!authorization) throw 'you-need-authorization' 
    const { userId } = await verifyToken(authorization)
    return !!userId
  }
  catch (err) {
    return err
  }
})

export const isUser = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  try {
    const { authorization } = ctx;
    const verify = await verifyToken(authorization)
    if (verify == 'TokenExpiredError: jwt expired') throw 'jwt expired'
    if (verify.role !== "User") throw 'user-role-not-authorized'
    return !!verify.userId
  }
  catch (err) {
    return err
  }
})

export const isAdmin = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  const { authorization } = ctx;
  const { userId, role } = await verifyToken(authorization)
  if (role !== "Admin") { return 'user-role-not-authorized' }
  return !!userId
})

export const getCredentials = async (authorization) => {
  try {
    return await verifyToken(authorization)
  }
  catch (err) {

  }
}