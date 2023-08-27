import React from "react";
import {NextPage} from "next";
import Charts from "@/modules/Charts/Charts";
import {getXataClient} from "@/xata/xata";

const Page: NextPage = async () => {

    const xata = getXataClient();
    const serverFetchedBeers = await xata.db.beers.select([
        "id",
        "name",
        "alcohol_percentage",
        "ml",
        "country",
        "initial_impression",
        "bought_in",
        "evidence_img",
        "preview_img",
        "additional_comments",
    ]).sort('name', 'asc').getAll();


    return (
        <>
            <Charts serverFetchedBeers={serverFetchedBeers}/>
        </>
    );
};

export default Page;
