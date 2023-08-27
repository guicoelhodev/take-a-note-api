import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

let usersData = [];

const typeDefs = `#graphql

  type Query {
    users: [String!]
  }

  type Mutation {
    createUser(name: String!): String!
  }
`;

const resolvers = {
  Query: {
    users: usersData,
  },

  Mutation: {
    createUser: (parent, args) => {
      usersData.push(args.name);
      return "User created succesfully!";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 8080 },
});

console.log("Server running on:", url);
