import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogProvider from "next-auth/providers/google";
import clientPromise from "./lib/mongodb";

export const authOptions = {
  // adapter
  adapter: MongoDBAdapter(clientPromise),

  // Configure one or more authentication providers
  providers: [
    GoogProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  // pages: {
  //   signIn: "/api/auth/signin",
  // },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
