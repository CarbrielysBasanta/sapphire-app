import express from "express";
import config from "./config/config.js";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import { application } from "./graphql/index.js";
import { initMongo } from "./config/mongo.js";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "./middleware/index.js";


async function init() {
  const app = express()
  const schema = application.createSchemaForApollo();
  const schemaWithPermissions = applyMiddleware(schema, permissions);
  const apolloServer = new ApolloServer({
    schema: schemaWithPermissions,
    method: 'POST',
    context: ({ req, reply }) => {
      return req.headers
    },
    introspection: true,
    playground: true
  })

  const graphqlPath = '/graphql'

  await initMongo()

  await apolloServer.start()
  apolloServer.applyMiddleware({app})

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())


  app.listen(config.PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${config.PORT}`)
    console.log(`🚀 Apollo Server ready at http://localhost:${config.PORT}${graphqlPath}`)
  })
  
}

init()