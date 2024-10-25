import { IProduct } from "knex/types/tables.js";
import Base from "./base";

interface IProductQuery {
  name?: string;
  description?: string;
  stock?: "asc" | "desc";
}

interface ProductWithUnitName extends IProduct {
  unit_name: string;
}

export default class ProductModel extends Base<IProduct> {
  static tableName = "products";

  public async getAllProducts(
    params: {
      page: number | string;
      perPage: number | string;
    } & IProductQuery
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
      .orderBy("products.created_at")
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
