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

const PersonalityData = `
  adjetives: String
  fears: String
  dreams: String
  craze: String
  sexualOrientation: String
  likes: String
  dislikes: String
`

const HistoryData = `
  present: String
  past: String
  future: String
`

const RelationData = `

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
#--------------TYPES--------------
type Appearance {
  ${appearance}
}

type Location {
  ${location}
}

type Character {
  _id: ID
  ${characterData}
  appearance: Appearance
  location: Location
}

type History {
  characterId: ID
  ${HistoryData}
}

type Relation {
  characterId: ID
  family: [personType]
  friends: [personType]
  enemy: [personType]
  lover: [personType]
}

type Personality {
  characterId: ID
  ${PersonalityData}
}

type AllDataCharacter {
  character: Character
  relation: Relation
  history: History
  personality: Personality
}

type personType {
  name: String
  age: String
  relation: String
}

#--------------INPUTS--------------
input createCharacterInput {
  id: ID
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

input createPersonalityInput {
  characterId: ID
  adjetives: String
  fears: String
  dreams: String
  craze: String
  sexualOrientation: String
  likes: String
  dislikes: String
}

input createHistoryInput {
  characterId: ID
  present: String
  past: String
  future: String
}

input createRelationInput {
  characterId: ID
  family: [personInput]
  friends: [personInput]
  enemy: [personInput]
  lover: [personInput]
}

input characterInput {
  id: ID
  ${characterData}
  location: LocationInput
  appearance: AppearanceInput
}

input personInput {
  name: String
  age: String
  relation: String
}

input OneCharacterInput {
  character: createCharacterInput
  relation: createRelationInput
  history: createHistoryInput
  personality: createPersonalityInput
}

input AppearanceInput {
  ${appearance}
}

input LocationInput {
  ${location}
}


#--------------QUERIES AND MUTATIONS--------------
type Query {
getOneCharacter(characterId: ID): AllDataCharacter
getAllCharacters: [Character]
numberOfCharacters: Int
}

type Mutation {
createCharacter(data: OneCharacterInput): AllDataCharacter
updateCharacter(data: OneCharacterInput): AllDataCharacter
deleteCharacter(id: ID): String
}
`
export { types }