"use client";

import BarChart from "@/modules/Charts/BarChart";
import PieChart from "@/modules/Charts/PieChart";
import { DARK_MODE } from "@/util/types";
import { useTheme } from "next-themes";
import styles from "./charts.module.css";

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
