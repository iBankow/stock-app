import UnitModel from "@/models/unit";
import { faker } from "@faker-js/faker";
import { IUnit } from "knex/types/tables.js";

function createRandomProduct(): Partial<IUnit> {
  return {
    name: faker.science.unit().name,
    description: faker.commerce.productDescription(),
    ratio: faker.number.int({ min: 1, max: 24 }),
  };
}

export async function GET() {
  const Unit = new UnitModel();

  let count = 0;
  while (count < 10) {
    const product = createRandomProduct();
    try {
      await Unit.createUnit(product);
      count++;
    } catch {
      continue;
    }
  }

  return Response.json({ ok: "ok" }, { status: 201 });
}
