import { NextPage } from "next";

import SeachControl from "@/components/SearchControl/SeachControl";
import UiComponent from "@/modules/UI/UiComponent";
import { getXataClient } from "@/xata/xata";
import { cookies } from "next/headers";
import Image from "next/image";

const Page: NextPage = async () => {
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
                    <div className="flex w-full justify-center">
                        <Image
                            src="/beerglasses.png"
                            alt={"beerImages"}
                            priority={false}
                            quality={100}
                            width={1150}
                            height={500}
                        />
                    </div>

                    <div className="absolute w-full px-[10px] flex justify-center xl:top-[120px] ">
                        <div className="max-w-[1366px] w-full">
                            <SeachControl />
                        </div>
                    </div>
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
