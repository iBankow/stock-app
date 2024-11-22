import orchestrator from "../../../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllService();
  await orchestrator.clearDatabase();
});

describe("POST /api/v1/units", () => {
  test("Create unit", async () => {
    const body = JSON.stringify({ name: "unidade", ratio: "1:2" });

    const response = await fetch("http://localhost:3000/api/v1/units", {
      method: "POST",
      body: body,
    });

    const responseBody = await response.json();

    expect(response.status).toBe(201);

    expect(responseBody.id).toEqual(1);
    expect(responseBody.name).toEqual("unidade");
    expect(responseBody.ratio).toEqual("1:2");
    expect(responseBody.is_deleted).toEqual(false);
  });
});
