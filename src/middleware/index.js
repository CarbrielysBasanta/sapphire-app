import { and, shield } from "graphql-shield";
import { isAdmin, isAuthorized, isUser } from "./authorization.js";

export const permissions = shield({
  Query: {
    getUser: and(isAuthorized, isUser),
    getAllUsers: and(isAuthorized, isAdmin),
    
  },
  Mutation: {
   updateNickname: and(isAuthorized, isUser),
   updateUser: and(isAuthorized, isUser),
   deleteUser: and(isAuthorized, isUser),
  } 
})