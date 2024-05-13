import React from "react";
import { NextPage } from "next";

import { getXataClient } from "@/xata/xata";
import UiComponent from "@/modules/UI/UiComponent";
import Image from "next/image";
import { getServerSession } from "next-auth";

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
                />
            </div>
        </>
    );
};

export default Page;

// import React from "react";
// import { NextPage } from "next";

// import { getXataClient } from "@/xata/xata";
// import UiComponent from "@/modules/UI/UiComponent";
// import Image from "next/image";
// import { getServerSession } from "next-auth";
// import { cookies } from "next/headers";
// import createCookie from "../actions";

// const Page: NextPage = async () => {
//     const xata = getXataClient();
//     const cookieStore = cookies();
//     const hasCookie = cookieStore.has("warehouseOwner");
//     const warehouseOwner = cookieStore?.get("warehouseOwner")?.value;

//     async function create(name: string, value: string) {
//         "use server";

//         cookies().set(name, value);
//     }

//     let serverFetchedBeers = [];
//     if (!hasCookie || warehouseOwner === "Kevin") {
//         serverFetchedBeers = await xata.db.beers
//             .select([
//                 "id",
//                 "name",
//                 "alcohol_percentage",
//                 "ml",
//                 "country",
//                 "initial_impression",
//                 "bought_in",
//                 "evidence_img",
//                 "additional_comments",
//             ])
//             .sort("name", "asc")
//             .getAll();

//         create("warehouseOwner", "Kevin");
//     } else {
//         serverFetchedBeers = await xata.db.usersBeers
//             .select([
//                 "id",
//                 "name",
//                 "alcohol_percentage",
//                 "ml",
//                 "country",
//                 "initial_impression",
//                 "bought_in",
//                 "evidence_img",
//                 "additional_comments",
//                 "owner",
//             ])
//             .filter({ owner: warehouseOwner })
//             .sort("name", "asc")
//             .getAll();
//     }

//     return (
//         <>
//             <div>
//                 <div className="bgWallpaper">
//                     <Image
//                         src="/beerglasses.png"
//                         alt={"beerImages"}
//                         priority={true}
//                         quality={100}
//                         width={1150}
//                         height={500}
//                     />
//                 </div>

//                 <UiComponent
//                     serverFetchedBeers={JSON.stringify(serverFetchedBeers)}
//                 />
//             </div>
//         </>
//     );
// };

// export default Page;
