import { IUser } from "knex/types/tables.js";
import bcrypt from "bcrypt";
import Base from "./base";

export default class UserModel extends Base<IUser> {
  static tableName = "users";

  public async getAllUsers(
    q: Partial<IUser>,
    paginate: { page: number; perPage: number },
  ) {
    const users = await this.findAll()
      .where((builder) => {
        if (q.name) {
          builder.whereILike("name", `%${q.name}%`);
        }
      })
      .paginate(paginate.page, paginate.perPage);

    return users;
  }

  public async createUser(data: Partial<Omit<IUser, "id">>) {
    let user = await this.query()
      .select("id")
      .where({ username: data.username, is_deleted: false })
      .first();

    if (user) {
      throw new Error(`Esse usuario já foi criado.`);
    }

    data.password = await bcrypt.hash(data.password || "", 10);

    user = await this.create(data);

    return user;
  }
}
