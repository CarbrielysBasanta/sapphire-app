import { gql } from "apollo-server-express"

const userData = `
  firstName: String!
  lastName: String!
  nickName: String
  description: String
  email: String!
  password: String!
  dateOfBorn: Date
  location: String
  genere: String
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
  ${userData}
  socialMedia: socialMediaInput
}

input socialMediaInput {
  facebook: String
}

input loginInput {
  nickName: String!
  password: String!
}

#--------------QUERIES AND MUTATIONS--------------
type Query {
  hello: String
  login(data: loginInput): User
}

type Mutation {
  saveUser(data: userInput): User

}
`
export { types }