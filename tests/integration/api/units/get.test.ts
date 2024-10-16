import { db } from "../../../../infra/database";
import orchestrator from "../../../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllService();
  await orchestrator.clearDatabase();

  await db("units").insert([
    { name: "unidade", ratio: "1:1" },
    { name: "unidade 2", ratio: "1:2" },
    { name: "test", ratio: "1:1" },
  ]);
});

describe("GET /api/v1/units", () => {
  test("Lists units", async () => {
    const response = await fetch("http://localhost:3000/api/v1/units");

    const responseBody = await response.json();

    expect(response.status).toBe(200);

    expect(Array.isArray(responseBody.data)).toBe(true);
    expect(responseBody.data.length).toBeGreaterThan(0);
  });

  test("Lists units with a search params", async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/units?name=test"
    );

    const responseBody = await response.json();

    expect(response.status).toBe(200);

    expect(Array.isArray(responseBody.data)).toBe(true);
    expect(responseBody.data.length).toBe(1);
  });

  test("Lists units with pagination", async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/units?page=2&perPage=1"
    );

    const responseBody = await response.json();

    expect(response.status).toBe(200);

    expect(Array.isArray(responseBody.data)).toBe(true);
    expect(responseBody.data.length).toBe(1);
    expect(responseBody.pagination.currentPage).toBe(2);
  });
});
