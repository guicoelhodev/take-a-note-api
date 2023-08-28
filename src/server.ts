import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { buildSchema } from "type-graphql";
import path, { dirname } from "node:path";

import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import { AuthResolver } from "./resolvers/AuthResolver.ts";
import { UsersResolver } from "./resolvers/Users.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const supabase = createClient(
  "https://nxwtqrdzqfrtutzajckq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54d3RxcmR6cWZydHV0emFqY2txIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMxNTcyMzYsImV4cCI6MjAwODczMzIzNn0.AZS37jxWOXCi3E1WC28JmJs2AnZzdw5DHLGHokHM370"
);

async function main() {
  const schema = await buildSchema({
    resolvers: [AuthResolver, UsersResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 8080 },
  });

  console.log("Server running on:", url);
}

main();
