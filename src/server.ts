import "reflect-metadata";
import dotenv from 'dotenv';

dotenv.config();

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { buildSchema } from "type-graphql";
import path, { dirname } from "node:path";

import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import { AuthResolver } from "./resolvers/AuthResolver/index.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function main() {
  const schema = await buildSchema({
    resolvers: [AuthResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.APP_PORT) || 4000 },
  });

  console.log("Server running on:", url);
}

main();
