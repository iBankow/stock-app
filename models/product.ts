import { IProduct } from "knex/types/tables.js";
import Base from "./base";

interface IProductQuery {
  name?: string;
  description?: string;
  order_stock?: "asc" | "desc";
  order_name?: "asc" | "desc";
}

interface ProductWithUnitName extends IProduct {
  unit_name: string;
}

export default class ProductModel extends Base<IProduct> {
  static tableName = "products";

  private orderQuery(
    params: {
      page: number | string;
      perPage: number | string;
    } & IProductQuery,
  ) {
    const order = [{ column: "products.id", order: "asc" }];

    for (const entries of Object.entries(params)) {
      if (entries[0].startsWith("order_")) {
        order.unshift({
          column: "products." + entries[0].slice(6),
          order: entries[1],
        });
      }
    }

    return order;
  }

  public async getAllProducts(
    params: {
      page: number | string;
      perPage: number | string;
    } & IProductQuery,
  ) {
    const products = this.findAll<ProductWithUnitName>("products.*")
      .select("units.name as unit_name")
      .where((builder) => {
        if (params.name) {
          builder.whereILike("products.name", `%${params.name}%`);
        }
        if (params.description) {
          builder.orWhereILike("description", `%${params.description}%`);
        }
      })
      .orderBy(this.orderQuery(params))
      .leftJoin("units", "products.unit_id", "units.id")
      .paginate(Number(params.page || 1), Number(params.perPage || 10))
      .then((data) => ({
        ...data,
        data: data.data.map(({ unit_name, ...product }) => ({
          ...product,
          unit: { name: unit_name },
        })),
      }));

    return products;
  }

  public async createProduct(data: Omit<Partial<IProduct>, "id">) {
    let product = await this.query()
      .select("id")
      .where({ name: data.name, is_deleted: false })
      .first();

    if (product) {
      throw new Error(`Essa unidade já foi criada.`);
    }

    product = await this.create(data);

    await this.db("product_stocks").insert({
      product_id: product.id,
      quantity: data.stock,
    });

    return product;
  }

  public async updateProduct(id: number, data: Omit<IProduct, "id">) {
    const product = await this.update(id, data);

    return product;
  }
}
