import express from "express";
import config from "./config/config.js";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import { types } from "./domains/user/schemas/typesDef.js";
import resolvers from "./domains/user/resolvers/user.js";
import { application } from "./graphql/index.js";


async function init() {
  const app = express()

  const schema = application.createSchemaForApollo();

  const apolloServer = new ApolloServer({
    schema
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({app})

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())


  app.listen(config.PORT, () => {
    console.log('Server on port', config.PORT)
  })
}

init()