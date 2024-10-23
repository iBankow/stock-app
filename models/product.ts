import { IProduct } from "knex/types/tables.js";
import Base from "./base";

interface IProductQuery {
  name?: string;
  description?: string;
  stock?: "asc" | "desc";
}

// interface IUpdateStock {
//   user_id: number;
//   product_id: number;
//   unit_id: number;
//   quantity: number;
//   ratio: string;
//   type: "INBOUND" | "OUTBOUND";
// }

export default class ProductModel extends Base<IProduct> {
  static tableName = "products";

  public async getAllProducts(
    params: {
      page: number | string;
      perPage: number | string;
    } & IProductQuery
  ) {
    const query = this.findAll("products.*", "units.name as unit_name")
      .where((builder) => {
        if (params.name) {
          builder.whereILike("products.name", `%${params.name}%`);
        }
        if (params.description) {
          builder.orWhereILike("description", `%${params.description}%`);
        }
      })
      .orderBy("stock")
      .orderBy("products.created_at")
      .leftJoin("units", "products.unit_id", "units.id")
      .paginate({
        currentPage: Number(params.page || "1"),
        perPage: Number(params.perPage || "10"),
        isLengthAware: true,
      });

    const products = await query;

    return products;
  }
}

// const Product = new ProductModel();
// export const ProductHistories = new ProductHistoriesModel();

// export async function createProduct(data: Omit<IProduct, "id">) {
//   let product = await Product.query().whereILike("name", data.name);

//   if (product) {
//     throw new Error(`Product already created`);
//   }

//   product = await Product.create(data);

//   return product;
// }

// export async function updateStock(data: IUpdateStock) {
//   const product = await Product.findById(data.product_id);

//   const ratio = data.ratio.split(":");
//   const stock =
//     data.type === "INBOUND"
//       ? product.stock + Number(ratio[1]) * data.quantity
//       : product.stock - Number(ratio[1]) * data.quantity;

//   await Product.update(data.product_id, { stock });
//   await ProductHistories.create({
//     ...data,
//   });

//   return product;
// }
