import { gql } from "apollo-server-express"

const types = gql`

type User {
  name: String
  lastName: String
}

type Query {
  hello: String
}

# hello: String

`

const queries = `
# user: Query
`

const mutations = `

`

export { types, queries, mutations }