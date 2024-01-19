import React from 'react';
import {NextPage} from "next";

import {getXataClient} from "@/xata/xata";
import UiComponent from "@/modules/UI/UiComponent";
import Image from "next/image";

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
        "additional_comments",
    ]).sort('name', 'asc').getAll();


    return (
        <>
            <div>
                <div className='bgWallpaper'>
                    <Image src='/beerglasses.png'
                           alt={'beerImages'}
                           priority={true}
                           quality={100}
                           width={1150}
                           height={500}
                    />
                </div>

                <UiComponent serverFetchedBeers={serverFetchedBeers}/>
            </div>
        </>);
};

export default Page;
