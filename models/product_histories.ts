import { IProductHistories } from "knex/types/tables.js";
import Base from "./base";

interface IProductHistoriesWithJoins extends IProductHistories {
  unit_name: string;
  product_name: string;
}

export default class ProductHistoriesModel extends Base<IProductHistories> {
  static tableName = "product_histories";

  public async getProductHistories(params: {
    page: number;
    perPage: number;
    [key: string]: string | number | boolean | Array<number | number>;
  }) {
    const units = await this.findAll<IProductHistoriesWithJoins>(
      "product_histories.*",
    )
      .select("products.name as product_name")
      .select("units.name as unit_name")
      .leftJoin("products", "product_histories.product_id", "products.id")
      .leftJoin("units", "product_histories.unit_id", "units.id")
      .orderBy("id", "desc")
      .paginate(params.page, params.perPage)
      .then((data) => ({
        ...data,
        data: data.data.map(({ unit_name, product_name, ...rest }) => ({
          ...rest,
          unit: { name: unit_name },
          product: { name: product_name },
        })),
      }));

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
          .insert({ ...history })
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
            quantity:
              history.type === "OUTBOUND"
                ? product.stock - total
                : product.stock + total,
          })
          .transacting(trx);
      }
    });

    return true;
  }
}
