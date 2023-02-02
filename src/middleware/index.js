import { shield } from "graphql-shield";
import { isAuthorized, isUser } from "./authorization.js";

export const permissions = shield({
  Query: {
    hello: isAuthorized,
  },
  Mutation: {
   updateNickname: isUser
  } 
})