import React from "react";
import { NextPage } from "next";
import Charts from "@/modules/Charts/Charts";
import { getXataClient } from "@/xata/xata";

const Page: NextPage = async () => {
    return (
        <>
            <Charts />
        </>
    );
};

export default Page;
