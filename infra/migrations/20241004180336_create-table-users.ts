import type { Knex } from "knex";

const TABLE_NAME = "users";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments("id", { primaryKey: true });
    table.string("name", 64).notNullable();
    table.string("username", 64).unique().notNullable();
    table.string("password", 128);
    table.boolean("is_active").defaultTo(false);
    table.boolean("is_deleted").defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
