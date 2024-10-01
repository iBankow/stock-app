import { Knex } from "knex";

const config: Knex.Config = {
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
  pool: { min: 1, max: 7 },
  migrations: {
    directory: "./infra/migrations/",
  },
  seeds: {
    directory: "./infra/seeds",
  },
};

export default config;
