'use client'

import React, {useEffect} from "react";
import {BeerType, DARK_MODE} from "@/util/types";
import PieChart from "@/modules/Charts/PieChart";
import styles from './charts.module.css'
import {useBeerStore} from "@/store/zustand";
import BarChart from "@/modules/Charts/BarChart";

interface ChartsProps {
    serverFetchedBeers: Array<BeerType>
}


function Charts({serverFetchedBeers}: ChartsProps) {
    const {theme} = useBeerStore();


    return (
        <div className='p-5 flex flex-col gap-5'>
            <div className={theme === DARK_MODE ? styles.chartsWrapper__dark : styles.chartsWrapper__light}>
                <PieChart serverFetchedBeers={serverFetchedBeers}/>
            </div>

            <div className={theme === DARK_MODE ? styles.chartsWrapper__dark : styles.chartsWrapper__light}>
                <BarChart serverFetchedBeers={serverFetchedBeers}/>
            </div>
        </div>)
}

export default Charts