// app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { XataAdapter } from "@next-auth/xata-adapter";
import { XataClient } from "@/xata/xata";
import bcrypt from "bcryptjs";

const xata = new XataClient();

export const authOptions = {
    adapter: XataAdapter(xata),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "jsmith",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = await xata.db.nextauth_users
                    .filter({
                        $any: [
                            { name: credentials?.username },
                            { email: credentials?.username },
                        ],
                    })
                    .getFirst();

                if (!user || !credentials?.password) {
                    return null;
                }

                const isPasswordValid = user.password
                    ? bcrypt.compare(credentials.password, user.password)
                    : false;

                if (isPasswordValid) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    };
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                token.id = user.id;
                token.username = user.name;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.name = token.username;
                session.user.email = token.email;
                session.user.role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
        // Add other custom pages if needed
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
};

const handler = NextAuth(authOptions as AuthOptions);
export { handler as GET, handler as POST };
