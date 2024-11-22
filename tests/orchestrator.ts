import retry from "async-retry";
import { db } from "../infra/database";

async function clearDatabase() {
  await db.raw("drop schema public cascade; create schema public;");
  await db.migrate.latest();
}

async function waitForAllService() {
  return waitForWebService();

  async function waitForWebService() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxRetryTime: 1000,
    });
  }

  async function fetchStatusPage() {
    const response = await fetch("http://localhost:3000/api/v1/status");

    if (response.status !== 200) throw Error();
  }
}

const orchestrator = {
  waitForAllService,
  clearDatabase,
};

export default orchestrator;
