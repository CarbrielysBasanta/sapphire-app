import { shield } from "graphql-shield";
import { isAuthorized } from "./authorization.js";

export const permissions = shield({
  Query: {
    hello: isAuthorized,
  },
  Mutation: {
   updateNickname: isAuthorized
  } 
})