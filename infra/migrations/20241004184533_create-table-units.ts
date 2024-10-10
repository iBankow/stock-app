import type { Knex } from "knex";

const TABLE_NAME = "units";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments("id", { primaryKey: true });
    table.string("name", 128).unique().notNullable();
    table.string("description", 255).notNullable();
    table.string("ratio").notNullable().defaultTo("1:1");

    table.boolean("is_deleted").defaultTo(true);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}