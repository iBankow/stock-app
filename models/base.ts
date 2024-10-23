import { db } from "@/infra/database";
import { Knex } from "knex";

type InsertData<T> =
  T extends Knex.CompositeTableType<unknown>
    ?
        | Knex.ResolveTableType<T, "insert">
        | ReadonlyArray<Knex.ResolveTableType<T, "insert">>
    : Knex.DbRecordArr<T> | ReadonlyArray<Knex.DbRecordArr<T>>;

type UpdateData<T> =
  T extends Knex.CompositeTableType<
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

  public query() {
    if (!this.table) {
      throw new Error(`table name is not defined`);
    }
    return this.db<T>(this.table);
  }

  protected findAll(...columns: string[]) {
    const selectedColumns = columns.length > 0 ? columns : ["*"];
    const findAllQuery = this.query().select(...selectedColumns);

    return findAllQuery;
  }

  protected findById(id: number) {
    const findByIdQuery = this.query().where("id", id).first();

    return findByIdQuery;
  }

  protected async create(data: InsertData<T>) {
    const created = await this.query().insert(data).returning("*");

    return created[0];
  }

  protected async update(id: number, data: UpdateData<T>) {
    const findData = await this.findById(id).select("id");

    if (!findData) {
      throw new Error(`table row '${this.table}' not found!`);
    }

    const updated = await this.query()
      .where("id", id)
      .update(data)
      .returning("*");

    if (Array.isArray(data)) {
      return updated;
    }

    return updated[0];
  }

  protected async drop(id: number): Promise<number> {
    return this.query().where("id", id).del();
  }
}
