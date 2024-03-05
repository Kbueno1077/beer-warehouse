"use client";

import React from "react";
import { BeerType } from "@/util/types";
import { useBeerStore } from "@/store/zustand";

import NextImage from "next/image";
import { Image } from "@nextui-org/react";
import FlagAvatar from "@/components/FlagAvatar/FlagAvatar";
import { useTranslations } from "next-intl";

interface BeerDetailsProps {
    beer: BeerType;
}

function BeerDetails({ beer }: BeerDetailsProps) {
    const { theme } = useBeerStore();
    const t = useTranslations("beerDetails");

    console.log(beer);

    return (
        <div className="flex flex-col gap-5 m-3 md:m-10">
            <div className="flex flex-col md:flex-row justify-evenly gap-5">
                <div className="flex flex-col gap-2">
                    <h1 className="mb-5 lg:ml-[-40px] text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">
                        {beer.name}
                    </h1>

                    <Image
                        isZoomed={true}
                        as={NextImage}
                        width={500}
                        height={500}
                        quality={100}
                        alt={`${beer.name} ${t("beer")} ${t("image")}`}
                        src={beer.evidence_img || ""}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <p className="text-2xl font-bold">{t("ml")} </p>
                        <span className={"font-normal"}>{beer.ml}</span>
                    </div>

                    <div className="flex gap-2 items-center">
                        <p className="text-2xl font-bold">{t("alcohol")}</p>
                        <span className={"font-normal"}>
                            {beer.alcohol_percentage} {t("abv")}
                        </span>
                    </div>

                    <div className="flex gap-2 items-center">
                        <p className="text-2xl font-bold">{t("impression")}</p>
                        <span className={"font-normal"}>
                            {beer.initial_impression}{" "}
                        </span>
                    </div>

                    <div className="flex gap-2 items-center">
                        <p className="text-2xl font-bold">{t("country")}</p>
                        <FlagAvatar value={beer.country} withName={true} />
                    </div>

                    <div className="flex gap-2 items-center">
                        <p className="text-2xl font-bold">{t("impression")}</p>
                        <span className={"font-normal"}>
                            {beer.initial_impression}{" "}
                        </span>
                    </div>

                    <div className="flex gap-2 items-center">
                        <p className="text-2xl font-bold">Bought In:</p>

                        <span className={"font-normal"}>{beer.bought_in}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BeerDetails;
