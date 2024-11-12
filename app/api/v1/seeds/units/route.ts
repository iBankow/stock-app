import UnitModel from "@/models/unit";
import { faker } from "@faker-js/faker";
import { IUnit } from "knex/types/tables.js";

function createRandomUnit(): Partial<IUnit> {
  return {
    name: faker.science.unit().name,
    description: faker.commerce.productDescription(),
    ratio: faker.number.int({ min: 1, max: 24 }),
  };
}

export async function GET() {
  const Unit = new UnitModel();

  const [unitCount] = await Unit.query().count("id");

  if (Number(unitCount.count) > 1) {
    return Response.json({ unit_count: unitCount }, { status: 200 });
  }

  let count = 0;
  while (count < 10) {
    const unit = createRandomUnit();
    try {
      await Unit.createUnit(unit);
      count++;
    } catch {
      continue;
    }
  }

  return Response.json({ ok: "ok" }, { status: 201 });
}
