import { IProduct } from "knex/types/tables.js";
import Base from "./base";

interface IProductQuery {
  name?: string;
  description?: string;
  stock?: "asc" | "desc";
}

export default class ProductModel extends Base<IProduct> {
  static tableName = "products";

  public async getAllProducts(
    params: {
      page: number | string;
      perPage: number | string;
    } & IProductQuery
  ) {
    const query = await this.findAll("products.*")
      .select("units.name as unit_name")
      .where((builder) => {
        if (params.name) {
          builder.whereILike("products.name", `%${params.name}%`);
        }
        if (params.description) {
          builder.orWhereILike("description", `%${params.description}%`);
        }
      })
      .orderBy("products.created_at")
      .leftJoin("units", "products.unit_id", "units.id")
      .paginate({
        currentPage: Number(params.page || "1"),
        perPage: Number(params.perPage || "10"),
        isLengthAware: true,
      })
      .then((data) => {
        return {
          ...data,
          data: data.data.map((product) => ({
            ...product,
            unit: { name: product.unit_name },
          })),
        };
      });

    return query;
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
