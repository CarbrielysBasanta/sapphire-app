import { gql } from "apollo-server-express"

const characterData = `
  authorId: String
  names: String
  lastNames: String
  age: Int
  dateOfBorn: Date
  role: String
  genere: String
  race: String
  power: String
  skill: String
  range: String
`

const appearance = `
  hair: String
  eyes: String
  skin: String
`
const location = `
  world: String
  city: String
  worldId: ID
`

const types = gql`
scalar Date
#--------------TYPES--------------
type Appearance {
  ${appearance}
}

type Location {
  ${location}
}

type Character {
  id: ID
  ${characterData}
  appearance: Appearance
  location: Location
}

#--------------INPUTS--------------
input createInput {
  names: String!
  lastNames: String
  age: Int
  dateOfBorn: Date
  role: String!
  genere: String!
  race: String
  power: String
  skill: String
  range: String
  location: LocationInput
  appearance: AppearanceInput
}

input characterInput {
  id: ID
  ${characterData}
  location: LocationInput
  appearance: AppearanceInput
}

input AppearanceInput {
  ${appearance}
}

input LocationInput {
  ${location}
}


#--------------QUERIES AND MUTATIONS--------------
type Query {
getOneCharacter(id: ID): Character
getAllCharacters: [Character]
numberOfCharacters(authorId: ID): Int
}

type Mutation {
createCharacter(data: createInput): Character
updateCharacter(data: characterInput): Character
deleteCharacter(id: ID): Character
}
`
export { types }