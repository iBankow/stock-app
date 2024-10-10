import Base from "./base";

export interface IProduct {
  id: number;
  user_id: number;
  product_id: number;
  unit_id: number;
  quantity: number;
  ratio: string;
  type: "INBOUND" | "OUTBOUND";
  created_at?: string;
}

export default class ProductHistoriesModel extends Base<IProduct> {
  static tableName = "product_histories";
}
