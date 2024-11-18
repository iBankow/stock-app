import UserModel from "@/models/user";
import { faker } from "@faker-js/faker";
import { IUser } from "knex/types/tables.js";

function createUserSeed(): Partial<IUser> {
  return {
    name: faker.person.fullName(),
    username: "user_name",
    password: "123123",
  };
}

export async function GET() {
  const User = new UserModel();

  const [userCount] = await User.query().count("id");

  if (Number(userCount.count) > 1) {
    return Response.json({ unit_count: userCount }, { status: 200 });
  }

  const user = createUserSeed();
  await User.createUser(user);

  return Response.json({ ok: "ok" }, { status: 201 });
}
