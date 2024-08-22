"use client";

import React, { useEffect } from "react";
import { CARD_MODE, DARK_MODE, TABLE_MODE } from "@/util/types";
import MobileSearchControls from "./CardsUI/SearchControls/MobileSearchControls";
import BeerGrid from "@/modules/UI/CardsUI/BeerGrid/BeerGrid";
import { Skeleton } from "@nextui-org/react";
import BeersTable from "@/modules/UI/TableUI/DataTable/BeersTable";
import { useBearContext } from "@/store/useBeerContext";
import { useTheme } from "next-themes";
import { NextauthUser } from "@next-auth/xata-adapter/dist/xata";

interface UiComponentProps {
    serverFetchedBeers: string;
    serverFetchedWarehouseOwner: string;
}

function UiComponent({
    serverFetchedBeers,
    serverFetchedWarehouseOwner,
}: UiComponentProps) {
    const { resolvedTheme } = useTheme();

    const {
        mode,
        allBeers,
        setAllBeers,
        loading,
        setWarehouseOwner,
        warehouseOwner,
    } = useBearContext((s) => {
        return {
            mode: s.mode,
            allBeers: s.allBeers,
            setAllBeers: s.setAllBeers,
            loading: s.loading,
            setMode: s.setMode,
            setWarehouseOwner: s.setWarehouseOwner,
            warehouseOwner: s.warehouseOwner,
        };
    });

    useEffect(() => {
        setAllBeers(JSON.parse(serverFetchedBeers));
        console.log(
            "🚀 ~ useEffect ~ JSON.parse(serverFetchedWarehouseOwner):",
            JSON.parse(serverFetchedWarehouseOwner)
        );
        setWarehouseOwner(JSON.parse(serverFetchedWarehouseOwner)[0]);
    }, [
        serverFetchedBeers,
        serverFetchedWarehouseOwner,
        setAllBeers,
        setWarehouseOwner,
    ]);

    if (loading && allBeers.length === 0 && !mode) {
        return (
            <div
                className={`dataTableWrapper ${
                    resolvedTheme === DARK_MODE && "dataTableWrapper__dark"
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
                            resolvedTheme === DARK_MODE
                                ? "dataCardWrapper__dark"
                                : ""
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
                            resolvedTheme === DARK_MODE
                                ? "dataTableWrapper__dark"
                                : ""
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
