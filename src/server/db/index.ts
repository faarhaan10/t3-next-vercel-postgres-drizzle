import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const url = env.DATABASE_URL;
try {
  const u = new URL(url);
  console.log("[DB]", { host: u.hostname, port: u.port, db: u.pathname });
} catch {
  console.log("[DB] DATABASE_URL not a valid URL");
}


const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });



// // src/db.ts
// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";

// import { env } from "@/env";

// const sql = neon(env.DATABASE_URL);
// export const db = drizzle({ client: sql });