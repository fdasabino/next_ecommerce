import User from "@/models/User";
import db from "@/utils/db";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogProvider from "next-auth/providers/google";
import clientPromise from "./lib/mongodb";

db.connectDB();

export const authOptions = {
    // adapter
    adapter: MongoDBAdapter(clientPromise),

    // Configure one or more authentication providers
    providers: [
        GoogProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: "credentials",
            async authorize(credentials, req) {
                const email = credentials.email;
                const password = credentials.password;

                // find user in db
                const user = await User.findOne({ email });
                if (user) {
                    return signInUser(password, user);
                } else {
                    throw new Error("Invalid credentials...Please try again.");
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            let user = await User.findById(token.sub);
            session.user._id = token.sub || user._id.toString();
            session.user.role = user.role || "user";
            token.role = user.role || "user";
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);

async function signInUser(password, user) {
    if (!user.password) {
        throw new Error("Please enter a password");
    }

    const enteredPassword = await bcrypt.compare(password, user.password);
    if (!enteredPassword) throw new Error("Invalid credentials...Please try again.");
    return user;
}
