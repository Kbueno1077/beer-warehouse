"use client";

import React, { useEffect } from "react";
import { BeerType, DARK_MODE } from "@/util/types";
import PieChart from "@/modules/Charts/PieChart";
import styles from "./charts.module.css";
import BarChart from "@/modules/Charts/BarChart";
import { useBearContext } from "@/store/useBeerContext";
import { useTheme } from "next-themes";

function Charts() {
    const { theme, resolvedTheme } = useTheme();
    const { allBeers } = useBearContext((s) => {
        return {
            allBeers: s.allBeers,
        };
    });

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
