import { createModule } from "graphql-modules";
import resolvers from "../domains/worlds/resolvers/worlds.js";
import { types } from "../domains/worlds/schemas/worlds.js";

export const worldModule = createModule({
  id: 'world-module',
  typeDefs: types,
  resolvers: resolvers
})