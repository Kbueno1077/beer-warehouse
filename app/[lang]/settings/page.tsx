import React from 'react';
import {NextPage} from "next";
import {getXataClient} from "@/xata/xata";


const Page: NextPage = async () => {

    const xata = getXataClient();
    const serverFetchedUsers = await xata.db.nextauth_users.select([
        "id",
        "name",
        "email",
        "image",
        "role"
    ]).getAll();


    // if (serverFetchedUsers.xata) {
    //     delete serverFetchedUsers.xata
    // }//

    return (
        <>
            {/*<Settings serverFetchedUsers={serverFetchedUsers}/>*/}
        </>);
};

export default Page;
