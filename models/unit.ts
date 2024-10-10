import Base from "./base";

export interface IUnit {
  id: number;
  name: string;
  description?: string;
  ratio: string;
  is_deleted: boolean;
  created_at?: string;
  updated_at?: string;
}

export default class UnitModel extends Base<IUnit> {
  static tableName = "unit";
}

const Unit = new UnitModel();

export async function getAllUnits(
  q: any,
  paginate: { page: number; perPage: number }
) {
  const units = await Unit.findAll()
    .where((builder) => {
      if (q.name) {
        builder.whereILike("name", `%${q.name}%`);
      }
    })
    .paginate({
      currentPage: paginate.page,
      perPage: paginate.perPage,
    });

  return units;
}

export async function createUnit(data: Omit<IUnit, "id">) {
  let unit = await Unit.query().whereILike("name", data.name);

  if (unit) {
    throw new Error(`Unit already created`);
  }

  unit = await Unit.create(data);

  return unit;
}
