import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { XataAdapter } from "@next-auth/xata-adapter";
import { XataClient } from "@/xata/xata";

const xata = new XataClient();

export default NextAuth({
    adapter: XataAdapter(xata),
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "jsmith",
                },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials: any, req: any) {
                const user: any = await xata.db.nextauth_users
                    .filter({
                        $any: [
                            { name: credentials?.username },
                            { email: credentials?.username },
                        ],
                    })
                    .getFirst();

                if (credentials?.password === user?.password) {
                    return user;
                }

                return null;
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token._id = user.id;
                token.username = user.name;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },

        async session({ session, user, token }: any) {
            if (token) {
                // session.user.id = user.id;
                // session.user.username = user.name;
                // session.user.email = user.email;
                session.user.role = token.role;
            }

            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days,
        updateAge: 24 * 60 * 60, // 24 hours
    },

    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
});
