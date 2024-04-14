"use client";

import React, { useEffect } from "react";
import { BeerType, DARK_MODE } from "@/util/types";
import PieChart from "@/modules/Charts/PieChart";
import styles from "./charts.module.css";
import BarChart from "@/modules/Charts/BarChart";
import { useTheme } from "next-themes";

interface ChartsProps {
    serverFetchedBeers: string;
}

function Charts({ serverFetchedBeers }: ChartsProps) {
    const allBeers = JSON.parse(serverFetchedBeers);
    const { resolvedTheme } = useTheme();

    return (
        <div className="p-5 flex flex-col gap-5">
            <div
                className={
                    resolvedTheme === DARK_MODE
                        ? styles.chartsWrapper__dark
                        : styles.chartsWrapper__light
                }
            >
                <PieChart serverFetchedBeers={allBeers} />
            </div>

            <div
                className={
                    resolvedTheme === DARK_MODE
                        ? styles.chartsWrapper__dark
                        : styles.chartsWrapper__light
                }
            >
                <BarChart serverFetchedBeers={allBeers} />
            </div>
        </div>
    );
}

export default Charts;
