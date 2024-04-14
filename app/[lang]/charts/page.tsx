import React from "react";
import { Metadata, NextPage } from "next";
import Charts from "@/modules/Charts/Charts";
import { getXataClient } from "@/xata/xata";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
    icons: { icon: "../favicon.ico" },
    title: "Charts",
};

const Page: NextPage = async () => {
    const session = await getServerSession();

    const xata = getXataClient();

    let serverFetchedBeers = [];
    if (!session || !session.user || session?.user.name === "Kevin") {
        serverFetchedBeers = await xata.db.beers
            .select([
                "id",
                "name",
                "alcohol_percentage",
                "ml",
                "country",
                "initial_impression",
                "bought_in",
                "evidence_img",
                "additional_comments",
            ])
            .sort("name", "asc")
            .getAll();
    } else {
        serverFetchedBeers = await xata.db.usersBeers
            .select([
                "id",
                "name",
                "alcohol_percentage",
                "ml",
                "country",
                "initial_impression",
                "bought_in",
                "evidence_img",
                "additional_comments",
                "owner",
            ])
            .filter({ owner: session.user.name })
            .sort("name", "asc")
            .getAll();
    }
    return (
        <>
            <Charts serverFetchedBeers={JSON.stringify(serverFetchedBeers)} />
        </>
    );
};

export default Page;
