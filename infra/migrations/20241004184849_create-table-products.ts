import type { Knex } from "knex";

const TABLE_NAME = "products";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments("id", { primaryKey: true });
    table.integer("user_id").unsigned();
    table.integer("unit_id").unsigned();
    table.string("name", 128).unique().notNullable();
    table.string("description", 255);
    table.float("stock", 8.2).notNullable().defaultTo(0);

    table.boolean("is_deleted").defaultTo(true);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    table.foreign("user_id").references("id").inTable("users");
    table.foreign("unit_id").references("id").inTable("units");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
