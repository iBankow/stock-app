import type { Knex } from "knex";

const TABLE_NAME = "user_sessions";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments("id", { primaryKey: true });
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("id").inTable("users");
    table.string("token", 96).unique().notNullable();

    table.timestamp("expires_at").notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
