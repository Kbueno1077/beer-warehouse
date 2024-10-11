import Collections from "@/modules/Collections/Collections";
import { getXataClient } from "@/xata/xata";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
    icons: { icon: "../favicon.ico" },
    title: "User's Collections",
};

const Page: NextPage = async () => {
    const xata = getXataClient();

    let serverFetchedUsers = [];
    serverFetchedUsers = await xata.db.nextauth_users
        .select([
            "id",
            "name",
            "email",
            "emailVerified",
            "image",
            "role",
            "xata.createdAt",
        ])
        .sort("name", "asc")
        .getAll();

    const users = serverFetchedUsers.filter((user) => user.name !== "guest");

    return (
        <>
            <Collections users={users} />
        </>
    );
};

export default Page;
