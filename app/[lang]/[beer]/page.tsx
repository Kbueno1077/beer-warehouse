import React from "react";
import {getXataClient} from "@/xata/xata";
import BeerDetails from "@/modules/BeerDetails/BeerDetails";

export default async function Page({params}: { params: { beer: string } }) {

    const xata = getXataClient();
    const record = await xata.db.beers.read(params.beer);


    return (
        <>
            {/*@ts-ignore*/}
            <BeerDetails beer={record}/>
        </>
    );
};

