//@ts-nocheck

"use client";

import ReactECharts from "echarts-for-react";
import React, { useEffect } from "react";
import { BeerType, DARK_MODE } from "@/util/types";
import { Button, ButtonGroup } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import countryCodes from "@/util/countries.json";
import { useTheme } from "next-themes";

interface PieChartsProps {
    serverFetchedBeers: Array<BeerType>;
}

function PieChart({ serverFetchedBeers }: PieChartsProps) {
    const [attribute, setAttribute] = React.useState("");
    const [data, setData] = React.useState([]);
    const { theme, resolvedTheme } = useTheme();
    const { innerWidth } = window;

    const t = useTranslations("charts.pie");
    const tcountries = useTranslations("countries");

    function changeAttribute(attribute: string) {
        const processedData = keyPieChart(serverFetchedBeers, attribute);
        setData(processedData);
        setAttribute(attribute);
    }

    function pieChartSize() {
        if (innerWidth < 768) {
            if (attribute === "country") {
                return ["20%", "40%"];
            }

            if (attribute === "alcohol_percentage") {
                return ["30%", "50%"];
            }
        }

        return ["40%", "70%"];
    }

    useEffect(() => {
        changeAttribute("country");
    }, []);

    const getOption = () => {
        return {
            title: {
                text: `${t("name")}: ${t(attribute)}`,
                left: "center",
                top: "20px",
            },

            tooltip: {
                formatter: "{b}: {c} ({d}%)",
                trigger: "item",
            },

            legend: {
                orient: "horizontal",
                bottom: "bottom",
                textStyle: {
                    color: resolvedTheme === DARK_MODE ? "white" : "#333333",
                },
            },

            emphasis:
                innerWidth >= 768
                    ? {
                          label: { formatter: "{b}: {d}%" },
                          itemStyle: {
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: "rgba(0, 0, 0, 0.5)",
                          },
                      }
                    : {},

            series: [
                {
                    top: innerWidth < 768 ? `-${data.length * 6}px` : 0,
                    type: "pie",
                    radius: pieChartSize(),
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: "#fff",
                        borderWidth: 2,
                    },

                    label: {
                        show: true,
                        color:
                            resolvedTheme === DARK_MODE ? "white" : "#333333",
                        position: "outside",
                    },

                    emphasis:
                        innerWidth >= 768
                            ? {
                                  label: {
                                      show: true,
                                      fontSize: 40,
                                      fontWeight: "bold",
                                  },
                              }
                            : {},
                    data: data,
                },
            ],
        };
    };

    function keyPieChart(array: Array<BeerType>, keyAttr: string) {
        let result: Object = {};
        for (let i = 0; i < array.length; i++) {
            let value = array[i][keyAttr];
            if (result[value] === undefined) {
                result[value] = 1;
            } else {
                result[value]++;
            }
        }

        const data = Object.keys(result).map((key) => {
            if (keyAttr === "country") {
                return {
                    value: result[key],
                    name: key !== "TBD" ? tcountries(countryCodes[key]) : "TBD",
                };
            }

            if (keyAttr === "ml") {
                return { value: result[key], name: `${key} ml` };
            }

            if (keyAttr === "alcohol_percentage") {
                return { value: result[key], name: `${key} ${t("abv")}` };
            }
            return { value: result[key], name: key };
        });

        return data;
    }

    return (
        <>
            <div className="w-full flex justify-center md:justify-start">
                <ButtonGroup variant="bordered" color="primary">
                    <Button
                        variant={attribute === "country" ? "solid" : "bordered"}
                        onClick={() => changeAttribute("country")}
                    >
                        {t("country")}
                    </Button>
                    <Button
                        variant={attribute === "ml" ? "solid" : "bordered"}
                        onClick={() => changeAttribute("ml")}
                    >
                        {t("ml")}
                    </Button>
                    <Button
                        variant={
                            attribute === "alcohol_percentage"
                                ? "solid"
                                : "bordered"
                        }
                        onClick={() => changeAttribute("alcohol_percentage")}
                    >
                        {t("alcohol_percentage")}
                    </Button>
                    {/*<Button onClick={() => changeAttribute('bought_in')}>Bought</Button>*/}
                </ButtonGroup>
            </div>

            {attribute && (
                <>
                    <div className="mt-2">
                        <ReactECharts
                            option={getOption()}
                            style={{
                                height: innerWidth > 1024 ? "800px" : "600px",
                                width: "100%",
                            }}
                            notMerge={true}
                            lazyUpdate={true}
                            theme="my_theme"
                        />
                    </div>

                    <div className="w-full flex justify-end items-center p-2 text-gray-500 italic">
                        {data.length} {t("instances")}
                    </div>
                </>
            )}
        </>
    );
}

export default PieChart;
