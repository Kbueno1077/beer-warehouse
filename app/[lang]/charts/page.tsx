import React from "react";
import { Metadata, NextPage } from "next";
import Charts from "@/modules/Charts/Charts";

export const metadata: Metadata = {
    icons: { icon: "../favicon.ico" },
    title: "Charts",
};

const Page: NextPage = async () => {
    return (
        <>
            <Charts />
        </>
    );
};

export default Page;
