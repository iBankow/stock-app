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
  static tableName = "units";
}

const Unit = new UnitModel();

export async function getAllUnits(params: {
  page: number;
  perPage: number;
  [key: string]: any;
}) {
  console.log(params.name);
  const units = await Unit.findAll()
    .where((builder) => {
      if (params.name) {
        builder.whereILike("name", `%${params.name}%`);
      }
    })
    .paginate({
      currentPage: params.page,
      perPage: params.perPage,
    });

  return units;
}

export async function createUnit(data: Omit<IUnit, "id">) {
  let unit = await Unit.query().whereILike("name", data.name);

  if (unit.length > 0) {
    throw new Error(`Unit already created`);
  }

  unit = await Unit.create(data);

  return unit;
}
