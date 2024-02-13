import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUserByEmail } from "../../../utils/db-auth-handler";
import { verifyPassword } from "../../../utils/password";

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize({ email, password }: any, req: any) {
        const user = await findUserByEmail(email);

        if (!user) {
          return null;
        }

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
          return null;
        }

        return { email } as any;
      },
    }),
  ],
});
