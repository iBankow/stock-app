import { IUnit } from "knex/types/tables.js";
import Base from "./base";

export default class UnitModel extends Base<IUnit> {
  static tableName = "units";

  public async getAllUnits(params: {
    page: number;
    perPage: number;
    [key: string]: string | number | boolean | Array<number | number>;
  }) {
    const units = await this.findAll()
      .where((builder) => {
        if (params.name) {
          builder.whereILike("name", `%${params.name}%`);
        }
      })
      .paginate(params.page, params.perPage);

    return units;
  }

  public async getUnitById(id: number) {
    const unit = await this.findById(id).select("*");

    return unit;
  }

  public async createUnit(data: Partial<Omit<IUnit, "id">>) {
    let unit = await this.query()
      .select("id")
      .where({ name: data.name, is_deleted: false })
      .first();

    if (unit) {
      throw new Error(`Unit already created`);
    }

    unit = await this.create(data);

    return unit;
  }

  public async updateUnit(id: number, data: Omit<IUnit, "id">) {
    const unit = await this.update(id, data);

    return unit;
  }

  public async deleteUnit(id: number) {
    const unit = await this.query().select("id").where({ id }).first();

    if (!unit) {
      throw new Error(`Unit not exists created`);
    }

    await this.update(id, {
      is_deleted: true,
      updated_at: new Date().toISOString(),
    });
  }
}
