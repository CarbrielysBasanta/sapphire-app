import { createModule } from "graphql-modules";
// import resolvers from "../domains/user/resolvers/user.js";
import resolvers from "../domains/characters/resolvers/characters.js";
// import { types } from "../domains/user/schemas/user.js";
import { types } from "../domains/characters/schemas/characters.js";

export const characterModule = createModule({
  id: 'character-module',
  typeDefs: types,
  resolvers: resolvers
})