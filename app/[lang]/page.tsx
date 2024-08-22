import React from "react";
import { NextPage } from "next";

import { getXataClient } from "@/xata/xata";
import UiComponent from "@/modules/UI/UiComponent";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

const Page: NextPage = async () => {
    const session = await getServerSession();
    const xata = getXataClient();
    const cookieStore = cookies();
    const hasCookie = cookieStore.has("cookieWarehouseOwner");
    const warehouseOwnerName = cookieStore?.get("cookieWarehouseOwner")?.value;

    let serverFetchedBeers = [];
    if (!hasCookie || warehouseOwnerName === "Kevin") {
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
            .filter({ owner: warehouseOwnerName })
            .sort("name", "asc")
            .getAll();
    }

    const serverFetchedWarehouseOwner = await xata.db.nextauth_users
        .select(["id", "name", "image"])
        .filter({ name: warehouseOwnerName || "Kevin" })
        .getAll();

    return (
        <>
            <div>
                <div className="bgWallpaper">
                    <Image
                        src="/beerglasses.png"
                        alt={"beerImages"}
                        priority={true}
                        quality={100}
                        width={1150}
                        height={500}
                    />
                </div>

                <UiComponent
                    serverFetchedBeers={JSON.stringify(serverFetchedBeers)}
                    serverFetchedWarehouseOwner={JSON.stringify(
                        serverFetchedWarehouseOwner
                    )}
                />
            </div>
        </>
    );
};

export default Page;
