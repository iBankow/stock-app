import "knex";
declare module "knex/types/tables.js" {
  interface User {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  }
  interface IUnit {
    id: number;
    name: string;
    description?: string;
    ratio: number;
    is_deleted: boolean;
    created_at?: string;
    updated_at?: string;
  }
  interface IProduct {
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

  interface IProductHistories {
    id: number;
    user_id: number;
    product_id: number;
    unit_id: number;
    quantity: number;
    ratio: number;
    type: "INBOUND" | "OUTBOUND";
    created_at?: string;
  }

  interface IProductStocks {
    id: number;
    user_id: number;
    product_id: number;
    quantity: number;
    created_at?: string;
  }

  interface Tables {
    users: User;
    units: IUnit;
    products: IProduct;
    product_histories: IProductHistories;
    product_stocks: IProductStocks;
  }
}
