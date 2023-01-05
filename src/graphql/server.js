import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import { applyMiddleware } from "graphql-middleware";

export const createApolloServer = ({app, schema}) => {
  // const schemaWithPermissions = applyMiddleware(schema, ...middlewares);

  return new ApolloServer({
    schema,
    context:({request, reply}) => ({
      request,
      reply
    }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
      {
        serverWillStart: async () => {
          return {
            drainServer: async () => {
              await app.close();
            },
          };
        },
      },
    ],
  })
}