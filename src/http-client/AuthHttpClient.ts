import { signIn } from "next-auth/react";

export const signUserIn = async (email: string, password: string) => {
  try {
    return await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  } catch (e) {
    console.log(e);
  }
};
