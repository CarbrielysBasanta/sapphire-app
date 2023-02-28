import { gql } from "apollo-server-express"

const TerritoryData = `
  name: String
  peopleName: String
  type: String
  epoch: String
  goverment: String
  leader: String
  economy: String
  history: String
  fauna: String
  flora: String
  weather: String
`

const ethnicityData = `
  ethnicityName: String
  ethnicityAbility: String
  isMagical: Boolean
`

const associatedTerritoriesData = `
  territoryName: String,
  territoryType: String
  territoryId: String
`

const levelData = `
  educational: String
  technological: String
  medicinal: String
`

const types = gql`
#--------------TYPES--------------
type Territory {
  id: ID
  authorId: ID
  ${TerritoryData}
  associatedTerritories: AssociatedTerritories
  ethnicity: Ethnicity
  level: Level
}

type Level {
  id: ID
  ${levelData}
}

type AssociatedTerritories {
  id: ID
  ${associatedTerritoriesData}
}

type Ethnicity {
  id: ID
  ${ethnicityData}
}

#--------------INPUTS--------------
input TerritoryInput {
  id: ID
  ${TerritoryData}
  associatedTerritories: AssociatedTerritoriesInput
  ethnicity: EthnicityInput
  level: LevelInput
}

input LevelInput {
  id: ID
  ${levelData}
}

input AssociatedTerritoriesInput {
  id: ID
  ${associatedTerritoriesData}
}

input EthnicityInput {
  id: ID
  ${ethnicityData}
}

#--------------QUERIES AND MUTATIONS--------------
type Query {
getOneTerritory(worldId: ID): Territory
getAllTerritories: [Territory]
numberOfTerritories: Int
}

type Mutation {
createTerritory(data: TerritoryInput): Territory
updateTerritory(data: TerritoryInput): Territory
deleteTerritory(id: ID, authorId: ID): String
}
`
export { types }