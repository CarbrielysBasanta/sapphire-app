import { and, shield } from "graphql-shield";
import { isAdmin, isAuthorized, isUser } from "./authorization.js";

export const permissions = shield({
  Query: {
    getUser: and(isAuthorized, isUser),
    getAllUsers: and(isAuthorized, isAdmin),
    getOneCharacter: and(isAuthorized, isUser),
    getAllCharacters: and(isAuthorized, isUser),
    numberOfCharacters: and(isAuthorized, isUser)
  },
  Mutation: {
   updateUser: and(isAuthorized, isUser),
   deleteUser: and(isAuthorized, isUser),
   createCharacter: and(isAuthorized, isUser),
   updateCharacter: and(isAuthorized, isUser),
   deleteCharacter: and(isAuthorized, isUser)
  } 
})