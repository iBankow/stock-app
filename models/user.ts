import Base from "./base";

export interface IUser {
  id: number;
  name: string;
  username: string;
  password?: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at?: string;
  updated_at?: string;
}

export default class UserModel extends Base<IUser> {
  static tableName = "users";
}
const User = new UserModel();

export async function getAllUsers(
  q: Partial<IUser>,
  paginate: { page: number; perPage: number },
) {
  const users = await User.findAll()
    .where((builder) => {
      if (q.name) {
        builder.whereILike("name", `%${q.name}%`);
      }
    })
    .paginate({
      currentPage: paginate.page,
      perPage: paginate.perPage,
    });

  return users;
}
