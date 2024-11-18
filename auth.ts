import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { IUser } from "knex/types/tables.js";
import UserModel from "./models/user";
import bcrypt from "bcrypt";

async function getUser(username: string): Promise<IUser | undefined> {
  const User = new UserModel();

  try {
    const user = await User.query().where("username", username).first();
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const user = await getUser(username);

          console.log(user);

          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user as any;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
