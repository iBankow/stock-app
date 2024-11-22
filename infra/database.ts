import knex from "knex";
import type { Knex as KnexType } from "knex";
import config from "../knexfile";

knex.QueryBuilder.extend(
  "paginate",
  function (currentPage = 1, perPage = 10): any {
    if (isNaN(perPage)) {
      throw new Error("Paginate error: perPage must be a number.");
    }

    if (isNaN(currentPage)) {
      throw new Error("Paginate error: currentPage must be a number.");
    }

    if (currentPage < 1) {
      currentPage = 1;
    }

    const offset = (currentPage - 1) * perPage;
    const limit = perPage;

    const countQuery = this.client
      .queryBuilder()
      .count("* as total")
      .from(this.clone().clearOrder().offset(0).as("subQuery"))
      .first();

    this.offset(offset).limit(limit);

    return this.client.transaction(
      async (trx: any) => {
        const result = await this.transacting(trx);

        const countResult = await countQuery.transacting(trx);
        const total = Number(countResult.total || 0);
        const last_page = Math.ceil(total / perPage);

        const pagination = {
          total,
          current_page: Number(currentPage),
          per_page: perPage,
          last_page,
          prev_page: currentPage > 1 ? currentPage - 1 : null,
          next_page: currentPage < last_page ? currentPage + 1 : null,
        };

        return { pagination, data: result };
      },
      undefined,
      undefined
    );
  }
);

const db: KnexType = knex({ client: "pg", ...config });

export { db };
