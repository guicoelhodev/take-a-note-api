import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { UsersResolver } from "./resolvers/Users.ts";
import { buildSchema } from "type-graphql";
import path, { dirname } from "node:path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  const schema = await buildSchema({
    resolvers: [UsersResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 8080 },
  });

  console.log("Server running on:", url);
}

main();
