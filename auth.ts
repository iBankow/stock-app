import bcrypt from "bcrypt";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import UserModel from "./models/user";
import { z } from "zod";

async function getUser(username: string) {
  const User = new UserModel();
  const user = await User.query()
    .select("*")
    .where("username", username)
    .first();

  return user;
}

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid credentials.";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let user = null;
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          throw new InvalidLoginError();
        }

        const { username, password } = parsedCredentials.data;

        user = await getUser(username);

        if (!user) {
          throw new InvalidLoginError();
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
          throw new InvalidLoginError();
        }

        return {
          id: String(user.id),
          name: user.name,
          username: user.username,
          created_at: user.created_at,
          updated_at: user.updated_at,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.user = user;
      }
      return token;
    },
    session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
