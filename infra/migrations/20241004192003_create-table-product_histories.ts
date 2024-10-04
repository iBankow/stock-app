import { UNITS } from "../../constants/types";
import type { Knex } from "knex";

const TABLE_NAME = "product_histories";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments("id", { primaryKey: true });
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("id").inTable("users");
    table.integer("product_id").unsigned();
    table.foreign("product_id").references("id").inTable("products");

    table
      .enu("unit", UNITS, {
        enumName: "units_type",
        useNative: true,
        existingType: true,
      })
      .unique()
      .notNullable();
    table
      .enu("type", ["OUTBOUND", "INBOUND"], {
        enumName: "units_type",
        useNative: true,
      })
      .unique()
      .notNullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
