/* eslint-disable @typescript-eslint/no-require-imports */
import knex from "knex";
import type { Knex } from "knex";
import { attachPaginate } from "knex-paginate";
import config from "../knexfile";

const db: Knex = knex({ client: "pg", ...config });
attachPaginate();

export { db };
