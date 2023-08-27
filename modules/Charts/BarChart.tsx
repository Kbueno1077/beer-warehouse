//@ts-nocheck

'use client'

import React, {useEffect} from "react";
import {BeerType} from "@/util/types";
import ReactECharts from "echarts-for-react";
import countryCodes from "@/util/countries.json";
import {useTranslations} from "next-intl";
import FlagAvatar from "@/components/FlagAvatar/FlagAvatar";

interface PieChartsProps {
    serverFetchedBeers: Array<BeerType>
}

function BarChart({serverFetchedBeers}: PieChartsProps) {
    const [data, setData] = React.useState(null)
    const tcountries = useTranslations('countries');

    useEffect(() => {
        keyBarChart()
    }, [])


    const keyBarChart = () => {
        let result = {};
        let impressions = ['Amazing', 'Excellent', 'Good', 'Average', 'Bad', 'Awful', 'Horrible'];

        serverFetchedBeers.forEach((beer: BeerType) => {
            // Initialize country if not already present
            if (!result[beer.country]) {
                result[beer.country] = {};
            }

            // Initialize impression if not already present
            if (!result[beer.country][beer.initial_impression]) {
                result[beer.country][beer.initial_impression] = 0;
            }

            // Increment the count
            result[beer.country][beer.initial_impression]++;
        });

        // Convert the result object to an array of arrays
        let output = [];
        output.push(['country', 'Amazing', 'Excellent', 'Good', "Average", "Bad", "Awful", "Horrible"],)

        for (let country in result) {

            let row = [country !== "TBD" ? tcountries(countryCodes[country]) : "TBD"];
            impressions.forEach(impression => {

                row.push(result[country][impression] || 0.1);
            });
            output.push(row);
        }

        setData(output)
        return output;
    }


    const getOption = () => {
        return {
            legend: {},
            tooltip: {
                formatter: function (params: any) {
                    let data = params.data[params.componentIndex + 1] === 0.1 ? '0' : params.data[params.componentIndex + 1];
                    return `${params.marker} ${params.name}<br/>${params.seriesName}: ${data}`;
                }
            },
            dataZoom: [
                {
                    id: 'dataZoomX',
                    type: 'slider',
                    xAxisIndex: [0],
                    filterMode: 'filter',
                    start: 0,
                    end: 10
                },

            ],
            dataset: {
                source: data
            },
            xAxis: {type: 'category'},
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [{type: 'bar',}, {type: 'bar'}, {type: 'bar'}, {type: 'bar'}, {type: 'bar'}, {type: 'bar'}, {type: 'bar'}]
        }
    };


    return (
        <>
            {data &&
                <ReactECharts
                    option={getOption()}
                    style={{
                        height: innerWidth > 1024 ? '800px' : '500px',
                        width: '100%',
                    }}
                    notMerge={true}
                    lazyUpdate={true}
                    theme='my_theme'
                />}
        </>
    )
}

export default BarChart