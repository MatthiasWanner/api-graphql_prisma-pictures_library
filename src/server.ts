import { ApolloServer } from "apollo-server-express";
import http from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import typeDefs from "./typeDefs";

import { userMutations, userQueries } from "./resolvers/users";
import { profileMutations, profileQueries } from "./resolvers/profiles";

dotenv.config();

const main = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(cors({ origin: "http://localhost:3000", credentials: true }));

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: {
      Query: {
        ...userQueries,
        ...profileQueries,
      },
      Mutation: {
        ...userMutations,
        ...profileMutations,
      },
    },
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  httpServer.listen(process.env.PORT, () => {
    console.log(
      `Server ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
    );
  });
};

main().catch((err) => {
  console.log(err);
});
