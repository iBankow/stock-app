import Base from "./base";
import ProductHistoriesModel from "./product_histories";

export interface IProduct {
  id: number;
  user_id: number;
  unit_id?: number;
  name: string;
  description: string;
  stock: number;
  is_deleted: boolean;
  created_at?: string;
  updated_at?: string;
}

interface IProductQuery {
  name?: string;
  description?: string;
  stock?: "asc" | "desc";
}

interface IUpdateStock {
  user_id: number;
  product_id: number;
  unit_id: number;
  quantity: number;
  ratio: string;
  type: "INBOUND" | "OUTBOUND";
}

export default class ProductModel extends Base<IProduct> {
  static tableName = "products";
}

const Product = new ProductModel();
export const ProductHistories = new ProductHistoriesModel();

export async function getAllProducts(
  q: IProductQuery,
  paginate: { page: number; perPage: number },
) {
  const products = await Product.findAll("products.*", "units.name")
    .where((builder) => {
      if (q.name) {
        builder.whereILike("name", `%${q.name}%`);
      }
      if (q.description) {
        builder.orWhereILike("description", `%${q.description}%`);
      }
      if (q.stock) {
        builder.orderBy("stock", q.stock);
      }
    })
    .innerJoin("units", "products.unit_id", "units.id")
    .paginate({
      currentPage: paginate.page,
      perPage: paginate.perPage,
    });

  return products;
}

export async function createProduct(data: Omit<IProduct, "id">) {
  let product = await Product.query().whereILike("name", data.name);

  if (product) {
    throw new Error(`Product already created`);
  }

  product = await Product.create(data);

  return product;
}

export async function updateStock(data: IUpdateStock) {
  const product = await Product.findById(data.product_id);

  const ratio = data.ratio.split(":");
  const stock =
    data.type === "INBOUND"
      ? product.stock + Number(ratio[1]) * data.quantity
      : product.stock - Number(ratio[1]) * data.quantity;

  await Product.update(data.product_id, { stock });
  await ProductHistories.create({
    ...data,
  });

  return product;
}
