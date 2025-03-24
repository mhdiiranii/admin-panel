import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import  { connectDb } from "./lib/mongoClient";
import bcrypt from "bcryptjs";
import { signInSchema } from "./lib/zod";
import { UserType } from "./models/types";
import Google from "next-auth/providers/google";
import User from "./models/userSchema";

declare module "next-auth" {
  interface User {
    username: string;
    role: string;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = await signInSchema.parseAsync(credentials);
        await connectDb();
        const user = await User.findOne({ email: email });
        if (!user) {
          throw new Error("user not-define!");
        }
        const validatePass = await bcrypt.compare(password, user?.password);

        if (!validatePass) {
          throw new Error("password not valid!");
        }

        const validUser: UserType = {
          username: user.username,
          password: user.password,
          email: user.email,
          role: user.role,
        };
        return validUser;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user) {
        return false;
      }
      await connectDb();
      const cheackUser = await User.findOne({
        $or:[{ email: user.email }],
      });
      if (cheackUser) {
        return true;
      }
      await User.insertOne({
        id: user.id,
        role: user.role || "user",
        email: user.email,
        username: user.username || user.name,
      });
      
      user.role = 'user'

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.username = user.username || user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
