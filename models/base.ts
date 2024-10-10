import { db } from "@/infra/database";
import { Knex } from "knex";

type InsertData<T> = T extends Knex.CompositeTableType<unknown>
  ?
      | Knex.ResolveTableType<T, "insert">
      | ReadonlyArray<Knex.ResolveTableType<T, "insert">>
  : Knex.DbRecordArr<T> | ReadonlyArray<Knex.DbRecordArr<T>>;

type UpdateData<T> = T extends Knex.CompositeTableType<
  unknown,
  unknown,
  Partial<unknown>,
  Partial<unknown>
>
  ? Knex.ResolveTableType<T, "update">
  : Knex.DbRecordArr<T>;

export default class Base<T extends object> {
  protected static tableName: string;
  private db: Knex;
  private table: string | undefined;

  constructor() {
    this.db = db;
    this.table = (this.constructor as typeof Base).tableName || undefined;
  }

  public query(): Knex.QueryBuilder<T> {
    if (!this.table) {
      throw new Error(`table name is not defined`);
    }
    return this.db<T>(this.table);
  }

  findAll(...columns: string[]): Knex.QueryBuilder<T> {
    const selectedColumns = columns.length > 0 ? columns : ["*"];
    const findAllQuery = this.query().select(...selectedColumns);

    return findAllQuery;
  }

  async findById(id: number) {
    return this.query().where("id", id).first();
  }

  async create(data: InsertData<T>) {
    await this.beforeCreate();

    const created = await this.db<T>().insert(data).returning("*");

    return created[0];
  }

  async update(id: number, data: UpdateData<T>) {
    const updated = await this.query()
      .where("id", id)
      .update(data)
      .returning("*");

    return updated[0];
  }

  async delete(id: number): Promise<number> {
    return this.query()
      .where("id", id)
      .update({ is_deleted: false } as any);
  }

  async drop(id: number): Promise<number> {
    return this.query().where("id", id).del();
  }

  async beforeCreate() {
    return;
  }
}
