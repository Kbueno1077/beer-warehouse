"use client";

import React, { useState } from "react";
import BeerCard from "@/modules/UI/CardsUI/BeerCard/BeerCard";
import { Avatar, Button, Chip } from "@nextui-org/react";
import { useBeerStore } from "@/store/zustand";
import { ADMIN_ROLE, BeerType, BeerTypeExtended } from "@/util/types";

import styles from "./beerGrid.module.css";
import {
    alcoholOptions,
    mapOperands,
    mapPercentToString,
} from "@/modules/UI/TableUI/DataTable/data";
import {
    countryFlagsToTheLeft,
    groupByMethod,
    sortBy,
} from "@/util/javascript";
import { isArray } from "@nextui-org/shared-utils";
import countryCodes from "@/util/countries.json";
import AddBeer from "@/modules/UI/BeerCrud/AddBeer";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

const BeerGrid = () => {
    const { data: session } = useSession();
    const user = session?.user;
    const t = useTranslations("cards");

    const { allBeers, filters, sort, groupBy } = useBeerStore();
    const hasSearchFilter = Boolean(filters.search);

    const [page, setPage] = useState<number>(1);
    const pageSize = 12;

    const loadMore = () => {
        setPage((prev) => prev + 1);
    };

    const processedItems = React.useMemo(() => {
        let unProccessData = [...allBeers];

        if (hasSearchFilter) {
            unProccessData = unProccessData.filter((beer: BeerType) => {
                return !!(
                    beer &&
                    beer.name &&
                    beer.name
                        .toLowerCase()
                        .includes(filters.search.toLowerCase())
                );
            });
        }

        if (filters?.alcoholFilters?.length !== alcoholOptions.length) {
            unProccessData = unProccessData.filter((beer) => {
                return filters.alcoholFilters.includes(
                    mapPercentToString(beer.alcohol_percentage)
                );
            });
        }

        if (
            filters?.mlFilters?.mlValue !== Number.NaN ||
            filters?.mlFilters?.mlValue === 0
        ) {
            unProccessData = unProccessData.filter((beer) => {
                // @ts-ignore
                return mapOperands(
                    filters.mlFilters.operand,
                    filters.mlFilters.mlValue,
                    beer.ml
                );
            });
        }

        if (filters.countryFilters.length) {
            unProccessData = unProccessData.filter((beer) => {
                // @ts-ignore
                return filters.countryFilters
                    .map((countryCode) => countryCode.value)
                    .includes(beer.country);
            });
        }

        if (sort.attribute && sort.direction) {
            unProccessData = sortBy(
                unProccessData,
                sort.attribute,
                sort.direction
            );
        }

        let proccessedBeers;
        if (groupBy) {
            proccessedBeers = groupByMethod(unProccessData, groupBy);
        } else {
            proccessedBeers = groupByMethod(unProccessData);
        }

        return proccessedBeers;
    }, [
        allBeers,
        hasSearchFilter,
        groupBy,
        filters.countryFilters,
        filters.search,
        filters.mlFilters.operand,
        filters.mlFilters.mlValue,
        filters.alcoholFilters,
        sort.attribute,
        sort.direction,
    ]);

    return (
        <>
            {/* @ts-ignore*/}
            {user && user.role === ADMIN_ROLE ? (
                <div className="flex justify-between align-middle items-center px-2 mb-[10px] w-full">
                    <p className="text-gray-500">
                        {" "}
                        {t("total", { count: processedItems.total })}
                    </p>
                    <AddBeer />
                </div>
            ) : (
                <div className="flex justify-end mb-[10px] w-full">
                    <p className="text-gray-500">
                        {" "}
                        {t("total", { count: processedItems.total })}
                    </p>
                </div>
            )}

            <div>
                {Object.keys(processedItems).map((key: any) => {
                    //@ts-ignore
                    const items = isArray(processedItems[key])
                        ? processedItems[key]
                        : [];
                    const displayGroup = key !== "total" && key !== "all";

                    return (
                        <div key={key}>
                            {displayGroup &&
                                items.length > 0 &&
                                items[0].order <= page * pageSize && (
                                    <div className="w-full pt-4 pb-3">
                                        {groupBy === "name" && (
                                            <Chip radius="sm" variant="faded">
                                                {key} :{" "}
                                            </Chip>
                                        )}

                                        {groupBy === "country" && (
                                            <Chip
                                                startContent={
                                                    <Avatar
                                                        alt="country flag"
                                                        className="w-4 h-4"
                                                        src={`https://flagcdn.com/${key}.svg`}
                                                        classNames={{
                                                            img:
                                                                typeof key ===
                                                                    "string" &&
                                                                countryFlagsToTheLeft.includes(
                                                                    key
                                                                )
                                                                    ? styles.countryImg
                                                                    : "",
                                                        }}
                                                    />
                                                }
                                                variant="faded"
                                                radius="sm"
                                            >
                                                {/*@ts-ignore*/}
                                                {countryCodes[key]}
                                            </Chip>
                                        )}
                                    </div>
                                )}

                            <div className={styles.mosaicView}>
                                {items
                                    .filter(
                                        (b: BeerTypeExtended) =>
                                            b.order <= page * pageSize
                                    )
                                    .map((beer: BeerType) => (
                                        <BeerCard key={beer.id} beer={beer} />
                                    ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="w-full">
                {processedItems.total === 0 && allBeers.length > 0 && (
                    <div className="flex justify-center mt-[20px] mb-[20px] w-full">
                        <p className="text-gray-500">
                            {t("no-beers-filter-message")}
                        </p>
                    </div>
                )}

                {allBeers.length === 0 && (
                    <div className="flex justify-center mt-[20px] mb-[20px] w-full">
                        <p className="text-gray-500">{t("no-beers-message")}</p>
                    </div>
                )}

                {page * pageSize < processedItems.total && (
                    <div className="flex justify-center mt-[20px] w-full">
                        <Button onPress={loadMore}>{t("load-more")}</Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default BeerGrid;
