"use client";

import React from "react";
import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import { useTranslations } from "next-intl";

export default function SlideCard() {
    const [open, setOpen] = React.useState(false);
    const t = useTranslations("friends");

    const handleClick = () => {
        setOpen(!open);
    };

    const openPicture = () => {
        window.open(
            "https://res.cloudinary.com/dub477vzt/image/upload/v1700543248/beers-cloudStore/Carolday.jpg",
            "_blank"
        );
    };

    return (
        <Card isFooterBlurred radius="lg" className="border-none">
            <Image
                alt="Woman listing to music"
                className={`object-cover transition-all duration-1000 ${
                    open && "blur-xl"
                }`}
                classNames={{ img: "sm:w-[220px] sm:h-[300px]" }}
                src="https://res.cloudinary.com/dub477vzt/image/upload/v1700543248/beers-cloudStore/Carolday.jpg"
            />

            <CardFooter className="justify-between items-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-20">
                <p className="text-tiny text-white/80"> CarolDay </p>
                <Button
                    className="text-tiny text-white bg-black/20"
                    variant="light"
                    color="default"
                    radius="lg"
                    size="sm"
                    onPress={handleClick}
                >
                    {!open ? t("details") : t("image")}
                </Button>
            </CardFooter>

            <div
                className={` text-white/80 absolute flex flex-col justify-center items-center text-center w-full h-[100%] top-0 z-10 transition-opacity duration-1000 ${
                    open ? "opacity-100" : "opacity-0"
                }`}
            >
                <p>{t("sentBy")} Vlado</p>
                <Button
                    onPress={openPicture}
                    size="sm"
                    className="mt-3 text-white"
                    variant="flat"
                >
                    {t("openPic")}
                </Button>
            </div>
        </Card>
    );
}
