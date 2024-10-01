/* eslint-disable @typescript-eslint/no-require-imports */
import type { Knex } from "knex";
const { attachPaginate } = require('knex-paginate');
import config from "@/knexfile";

const db: Knex = require("knex")(config);
attachPaginate();

export { db };
