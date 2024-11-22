"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });
  } catch (error: any) {
    if (error) {
      switch (error.type) {
        case "CredentialsSignin":
          return { time: Date.now(), message: "Credenciais inválidas." };
        default:
          return { time: Date.now(), message: "Algo inseperado ocorreu." };
      }
    }
    throw error;
  }
  redirect("/dashboard");
}
