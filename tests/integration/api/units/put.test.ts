import { db } from "../../../../infra/database";
import orchestrator from "../../../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllService();
  await orchestrator.clearDatabase();

  await db("units").insert([{ name: "unidade", ratio: "1:1" }]);
});

describe("PUT /api/v1/units/:id", () => {
  test("Update unit", async () => {
    const body = JSON.stringify({ name: "unidade 2", ratio: "1:2" });

    const response = await fetch("http://localhost:3000/api/v1/units/1", {
      method: "PUT",
      body: body,
    });

    const responseBody = await response.json();

    expect(response.status).toBe(206);

    expect(responseBody.id).toEqual(1);
    expect(responseBody.name).toEqual("unidade 2");
    expect(responseBody.ratio).toEqual("1:2");
    expect(responseBody.is_deleted).toEqual(false);
  });
});
