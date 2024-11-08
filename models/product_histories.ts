import { IProductHistories } from "knex/types/tables.js";
import Base from "./base";

export default class ProductHistoriesModel extends Base<IProductHistories> {
  static tableName = "product_histories";

  public async getProductHistories(params: {
    page: number;
    perPage: number;
    [key: string]: string | number | boolean | Array<number | number>;
  }) {
    const units = await this.findAll().paginate(params.page, params.perPage);

    return units;
  }

  public async createProductHistories(
    data: Omit<Partial<IProductHistories>[], "id">,
  ) {
    await this.db.transaction(async (trx) => {
      for (const history of data) {
        const total = Number(history.ratio) * history.quantity!;

        const product = await this.db("products")
          .select("stock", "name")
          .where("id", history.product_id)
          .first()
          .transacting(trx);

        if (!product) {
          throw Error;
        }

        if (history.type === "OUTBOUND") {
          if (product && total > product.stock) {
            throw new Error(
              `O estoque do produto ${product.name} é insuficiente para a saíada.`,
            );
          }
        }

        await this.db("product_histories")
          .insert({ ...history, ratio: `1:${history.ratio}` })
          .transacting(trx);
        await this.db("products")
          .where("id", history.product_id)
          .update({
            stock:
              history.type === "OUTBOUND"
                ? product.stock - total
                : product.stock + total,
          })
          .transacting(trx);
        await this.db("product_stocks")
          .insert({
            product_id: history.product_id,
            quantity: product.stock,
          })
          .transacting(trx);
      }
    });

    return true;
  }
}
