import "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            name: string;
            role: string;
            image: string;
            email: string;
        };
    }
}
