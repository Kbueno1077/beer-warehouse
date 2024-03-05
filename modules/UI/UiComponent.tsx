"use client";

import React, { useEffect, useState } from "react";
import { useBeerStore } from "@/store/zustand";
import { BeerType, CARD_MODE, DARK_MODE, TABLE_MODE } from "@/util/types";
import MobileSearchControls from "./CardsUI/SearchControls/MobileSearchControls";
import BeerGrid from "@/modules/UI/CardsUI/BeerGrid/BeerGrid";
import { Skeleton } from "@nextui-org/react";
import BeersTable from "@/modules/UI/TableUI/DataTable/BeersTable";

interface UiComponentProps {
    serverFetchedBeers: Array<BeerType>;
}

function UiComponent({ serverFetchedBeers }: UiComponentProps) {
    const [loadingData, setLoadingData] = useState<boolean>(true);
    const { theme, mode, setMode, allBeers, setAllBeers } = useBeerStore();

    useEffect(() => {
        const getMode = window.innerWidth < 1024 ? CARD_MODE : TABLE_MODE;
        setMode(getMode);
        setAllBeers(serverFetchedBeers);
        setLoadingData(false);
    }, [setMode, serverFetchedBeers, setAllBeers]);

    if (loadingData && allBeers.length === 0 && !mode) {
        return (
            <div
                className={`dataTableWrapper ${
                    theme === DARK_MODE && "dataTableWrapper__dark"
                }`}
            >
                <Skeleton className="rounded-lg">
                    <div className="h-[600px] w-full rounded-lg bg-default-300"></div>
                </Skeleton>
            </div>
        );
    }

    return (
        <>
            {mode === CARD_MODE && (
                <>
                    <div
                        className={`dataCardWrapper ${
                            theme === DARK_MODE ? "dataCardWrapper__dark" : ""
                        }`}
                    >
                        <BeerGrid />
                    </div>

                    <MobileSearchControls />
                </>
            )}

            {mode === TABLE_MODE && (
                <>
                    <div
                        className={`dataTableWrapper ${
                            theme === DARK_MODE ? "dataTableWrapper__dark" : ""
                        }`}
                    >
                        <BeersTable />
                    </div>
                </>
            )}
        </>
    );
}

export default UiComponent;
