"use client";

import { BeerType } from "@/util/types";

import FlagAvatar from "@/components/FlagAvatar/FlagAvatar";
import ImpressionIcons from "@/components/ImpressionIcons/ImpressionIcons";
import { Image } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import NextImage from "next/image";

interface BeerDetailsProps {
    beer: BeerType;
}

function BeerDetails({ beer }: BeerDetailsProps) {
    const t = useTranslations("beerDetails");
    const timpression = useTranslations("impression");

    return (
        <div className="flex flex-col md:flex-row justify-evenly w-full">
            <div className="flex flex-col md:flex-row justify-between md:gap-15">
                <div className="flex flex-col gap-2 p-5">
                    <Image
                        className="cursor-pointer"
                        isZoomed={true}
                        as={NextImage}
                        width={520}
                        height={320}
                        quality={100}
                        alt={`${beer.name} ${t("beer")} ${t("image")}`}
                        src={beer.evidence_img || ""}
                    />
                </div>

                <div className="flex flex-col gap-2 p-5">
                    <h1 className="text-5xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl mb-5">
                        {beer.name}
                    </h1>

                    {beer.ml && (
                        <div className="flex gap-2 items-center">
                            <p className="text-2xl font-bold">{t("ml")}:</p>
                            <span className={"font-normal text-xl"}>
                                {beer.ml}
                            </span>
                        </div>
                    )}

                    {!!beer.alcohol_percentage && (
                        <div className="flex gap-2 items-center">
                            <p className="text-2xl font-bold">
                                {t("alcohol")}:
                            </p>
                            <span className={"font-normal text-xl"}>
                                {beer.alcohol_percentage} {t("abv")}
                            </span>
                        </div>
                    )}

                    {beer.country && (
                        <div className="flex gap-2 items-center">
                            <p className="text-2xl font-bold">
                                {t("country")}:
                            </p>
                            <FlagAvatar
                                value={beer.country}
                                withName={true}
                                nameClassName="text-xl"
                            />
                        </div>
                    )}

                    {beer.initial_impression && (
                        <div className="flex gap-2 items-center">
                            <p className="text-2xl font-bold">
                                {t("impression")}:
                            </p>

                            <ImpressionIcons
                                initial_impression={beer.initial_impression}
                            />

                            <span className={"font-normal text-xl"}>
                                {timpression(beer.initial_impression)}:
                            </span>
                        </div>
                    )}

                    {beer.bought_in && (
                        <div className="flex gap-2 items-center">
                            <p className="text-2xl font-bold">{t("bought")}:</p>
                            <FlagAvatar
                                value={beer.bought_in}
                                withName={true}
                                nameClassName="text-xl"
                            />
                        </div>
                    )}

                    {beer.additional_comments && (
                        <div className="flex flex-col gap-2 ">
                            <p className="text-2xl font-bold">
                                {t("comments")}:
                            </p>
                            <p className="text-xl">
                                {beer.additional_comments}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BeerDetails;
