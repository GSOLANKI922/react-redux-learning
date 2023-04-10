import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { quotes, users } from "./fakedb.js";

const typeDefs = `
  type Query {
    users: [User]
    user(id:ID!):User
    quotes: [Quote]
    iquote(by:ID!):[Quote]
  }

  type User{
    id:ID!
    firstName: String
    lastname: String
    email: String
    password: String
    quotes: [Quote]
  }

  type Quote{
    name: String
    by: ID!
  }
  `;

const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find((user) => user.id == id),
    quotes: () => quotes,
    iquote: (_, { by }) => quotes.filter((quo) => quo.by == by),
  },
  User: {
    quotes: (ur) => quotes.filter((quo) => quo.by == ur.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

await startStandaloneServer(server, {
  listen: { port: 4000 },
});
