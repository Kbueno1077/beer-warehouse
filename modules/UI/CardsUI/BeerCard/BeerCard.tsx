"use client";

import NextImage from "next/image";

import {
    Accordion,
    AccordionItem,
    Button,
    Card,
    CardFooter,
    CardHeader,
    Chip,
    Skeleton,
} from "@nextui-org/react";
import { ADMIN_ROLE, BeerType } from "@/util/types";
import styles from "./beerCard.module.css";
import React, { useState } from "react";
import DeleteBeer from "@/modules/UI/BeerCrud/DeleteBeer";
import UpdateBeer from "@/modules/UI/BeerCrud/UpdateBeer";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import FlagAvatar from "@/components/FlagAvatar/FlagAvatar";
import { TbScanEye } from "react-icons/tb";

interface BeerCardProps {
    beer: BeerType;
    isOwner: boolean;
}

const BeerCard = ({ beer, isOwner }: BeerCardProps) => {
    const { data: session } = useSession();
    const user = session?.user;

    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const [selectedKeys, setSelectedKeys] = useState<Iterable<any>>(
        new Set([])
    );
    const t = useTranslations("card");

    const imageSplit = beer.evidence_img
        ? beer.evidence_img.split("upload")
        : ["", ""];
    const lowRes = imageSplit[0] + "upload/q_30" + imageSplit[1];

    return (
        <Card isFooterBlurred={true}>
            <CardHeader className="absolute z-10 top-1 flex justify-between items-start">
                <Chip variant="light" radius="sm" className={styles.chipName}>
                    <p className="text-tiny text-white/75 uppercase font-bold">
                        {beer.name}
                    </p>
                </Chip>
            </CardHeader>

            <div className="w-full h-[280px] relative">
                <NextImage
                    quality={50}
                    fill
                    style={{ borderRadius: "10px", objectFit: "cover" }}
                    sizes="(max-width: 768px) 33vw, (max-width: 1200px) 33vw, 30vw"
                    src={lowRes || ""}
                    priority={true}
                    onLoadingComplete={() => {
                        setImageLoaded(true);
                    }}
                    alt={`Image of Beer: ${beer.name}`}
                />

                {!imageLoaded && (
                    <Skeleton className="rounded-xl">
                        <div className="h-[280px] rounded-xl bg-default-300"></div>
                    </Skeleton>
                )}
            </div>

            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 flex-col">
                <div className="w-full flex align-middle items-center justify-between">
                    <div>
                        <p className="text-black text-tiny">
                            {beer.alcohol_percentage >= 0
                                ? `${t("abv")}: ${beer.alcohol_percentage} %`
                                : t("abv-na")}
                        </p>
                        <p className="text-black text-tiny">ML: {beer.ml} </p>
                    </div>

                    {beer.country !== "TBD" && beer.country !== "" && (
                        <FlagAvatar value={beer.country} />
                    )}
                </div>

                {user && isOwner && (
                    <Accordion
                        className="w-full px-0 mt-2 mb-[-8px]"
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                        itemClasses={{
                            trigger: styles.accordionWrapper,
                        }}
                    >
                        <AccordionItem
                            indicator={({ isOpen }) =>
                                isOpen ? <div></div> : <div></div>
                            }
                            key="1"
                            classNames={{ trigger: styles.wrapper }}
                            aria-label="Beer Actions"
                            startContent={
                                <div
                                    style={{
                                        transform: (selectedKeys as Set<any>)
                                            .size
                                            ? "rotate(180deg)"
                                            : "",
                                    }}
                                    className={styles.startContent}
                                >
                                    <MdKeyboardArrowUp
                                        className={styles.arrowOpenSearch}
                                    />
                                </div>
                            }
                        >
                            <div className="flex gap-1 ">
                                <Button
                                    size={"sm"}
                                    variant="faded"
                                    isIconOnly
                                    color="danger"
                                >
                                    <TbScanEye className="h-[17px] w-[17px] text-gray-500" />
                                </Button>
                                <UpdateBeer
                                    selectedBeer={beer}
                                    isOwner={isOwner}
                                />
                                <DeleteBeer
                                    selectedBeer={beer}
                                    isOwner={isOwner}
                                />
                            </div>
                        </AccordionItem>
                    </Accordion>
                )}
            </CardFooter>
        </Card>
    );
};

export default BeerCard;
