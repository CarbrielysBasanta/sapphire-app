import { createModule } from "graphql-modules";
import resolvers from "../domains/user/resolvers/user.js";
import { types } from "../domains/user/schemas/user.js";

export const userModule = createModule({
  id: 'user-module',
  typeDefs: types,
  resolvers: resolvers
})