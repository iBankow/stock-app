import { db } from "@/infra/database";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_: Request) {
  const version = await db.raw(`SHOW server_version;`);
  const maxConnections = await db.raw("SHOW max_connections;");
  const activityConnection = await db.raw(
    "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = ?;",
    [process.env.POSTGRES_DB],
  );

  return Response.json({
    api: "confia",
    db: {
      version: version.rows[0].server_version,
      max_connections: maxConnections.rows[0].max_connections,
      activity_connections: activityConnection.rows[0].count,
    },
  });
}
