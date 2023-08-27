'use client'

import React from "react";
import {NextPage} from "next";

import FriendsBeers from "@/modules/Friends/FriendsBeers/FriendsBeers";

const Page: NextPage = () => {
    return (
        <>
            <div className='w-full flex justify-center'>
                <FriendsBeers/>
            </div>
        </>
    );
};

export default Page;
