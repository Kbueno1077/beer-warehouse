"use client";

import NextImage from "next/image";

import FlagAvatar from "@/components/FlagAvatar/FlagAvatar";
import ImpressionIcons from "@/components/ImpressionIcons/ImpressionIcons";
import DeleteBeer from "@/modules/UI/BeerCrud/DeleteBeer";
import UpdateBeer from "@/modules/UI/BeerCrud/UpdateBeer";
import { BeerType } from "@/util/types";
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
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { TbScanEye } from "react-icons/tb";
import styles from "./beerCard.module.css";

interface BeerCardProps {
    beer: BeerType;
    isOwner: boolean;
}

const BeerCard = ({ beer, isOwner }: BeerCardProps) => {
    console.log(isOwner);
    const { data: session } = useSession();
    const router = useRouter();

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

    const openDetails = () => {
        //@ts-ignore
        router.push({ pathname: `/beerDetails/${beer.id}` });
    };

    return (
        <Card isFooterBlurred={true} onPress={openDetails} isPressable={true}>
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
                    <div className="w-full flex align-middle items-center gap-1">
                        {beer.initial_impression && (
                            <ImpressionIcons
                                initial_impression={beer.initial_impression}
                            />
                        )}

                        <div>
                            <p className="text-black text-tiny">
                                {beer.alcohol_percentage >= 0
                                    ? `${t("abv")}: ${
                                          beer.alcohol_percentage
                                      } %`
                                    : t("abv-na")}
                            </p>
                            <p className="text-black text-tiny">
                                ML: {beer.ml}{" "}
                            </p>
                        </div>
                    </div>

                    {beer.country !== "TBD" && beer.country !== "" && (
                        <FlagAvatar value={beer.country} />
                    )}
                </div>
            </CardFooter>
        </Card>
    );
};

export default BeerCard;
