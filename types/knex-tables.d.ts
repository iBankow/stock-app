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
    ratio: string;
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
  interface Tables {
    users: User;
    units: IUnit;
    products: IProduct;
  }
}
