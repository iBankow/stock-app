import type { Knex } from "knex";

const TABLE_NAME = "product_stocks";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments("id", { primaryKey: true });
    table.integer("user_id").unsigned();
    table.integer("product_id").unsigned();
    table.integer("unit_id").unsigned();
    table.float("quantity", 8.2).notNullable().defaultTo(1);
    table.timestamp("created_at").defaultTo(knex.fn.now());

    table.foreign("unit_id").references("id").inTable("units");
    table.foreign("user_id").references("id").inTable("users");
    table.foreign("product_id").references("id").inTable("products");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
