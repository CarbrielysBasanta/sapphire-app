import { gql } from "apollo-server-express"

const userData = `
  fullName: String
  nickName: String
  description: String
  email: String
  password: String
  dateOfBorn: Date
  location: String
  genere: String
  role: String
`

const types = gql`
scalar Date
#--------------TYPES--------------
type User {
  id: ID
  ${userData}
  socialMedia: socialMedia
  token: String
}

type socialMedia {
  facebook: String
}

#--------------INPUTS--------------
input userInput {
  id: ID
  ${userData}
  socialMedia: socialMediaInput
}

input socialMediaInput {
  facebook: String
}

input loginInput {
  nickName: String
  password: String!
  email: String
}

#--------------QUERIES AND MUTATIONS--------------
type Query {
  login(data: loginInput): User
  getUser(email: String): User
  getAllUsers: [User]
}

type Mutation {
  saveUser(data: userInput): User
  updateUser(data: userInput): User
  deleteUser(email: String, password: String): User
}
`
export { types }