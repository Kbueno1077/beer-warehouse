"use client";

import { format } from "@formkit/tempo";

import { useBearContext } from "@/store/useBeerContext";
import { NextAuthUserExtended } from "@/store/zustand";
import { Card, CardBody, Image } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { IoCodeSlash } from "react-icons/io5";

interface CollectionsProps {
    users: NextAuthUserExtended[];
}

function Collections({ users }: CollectionsProps) {
    const locale = useLocale();
    const t = useTranslations();

    const { data: session } = useSession();
    const user = session?.user;

    const { warehouseOwner, handleWarehouseChange } = useBearContext((s) => {
        return {
            warehouseOwner: s.warehouseOwner,
            handleWarehouseChange: s.handleWarehouseChange,
        };
    });

    const handleWarehouse = async (us3er: NextAuthUserExtended) => {
        const newWarehouse = await handleWarehouseChange(us3er);
    };

    return (
        <>
            <div className="w-full flex justify-center mt-5 sm:mt-10">
                <div className="p-2 pb-4 flex gap-4 flex-col items-center sm:items-stretch md:flex-row flex-wrap justify-center w-full max-w-[3000px]">
                    <h1 className="text-4xl font-bold">
                        You are looking the {'"'}
                        {warehouseOwner?.name}
                        {'"'} collection
                    </h1>
                    <div></div>
                </div>
            </div>

            <div className="w-full flex justify-center sm:mt-5">
                <div className="p-2 pb-4 flex gap-4 flex-col items-center sm:items-stretch md:flex-row flex-wrap justify-center w-full max-w-[3000px]">
                    {users.map((us3er, index) => (
                        <Card
                            key={us3er.id}
                            isBlurred
                            className="border-none cursor-pointer bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                            shadow="sm"
                            isPressable={true}
                            onPress={() => {
                                handleWarehouse(us3er);
                            }}
                        >
                            <CardBody
                                className={`sm:flex sm:justify-center sm:item-center ${
                                    us3er.name === warehouseOwner?.name &&
                                    "bg-primary/20 "
                                }`}
                            >
                                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                                    <div className="relative col-span-6 md:col-span-4">
                                        <Image
                                            alt="Album cover"
                                            className="object-cover"
                                            height={200}
                                            shadow="md"
                                            src={us3er.image ?? ""}
                                            width="100%"
                                        />
                                    </div>

                                    <div className="flex flex-col col-span-6 md:col-span-8 h-[100%] ">
                                        <div className="flex justify-between items-start h-[100%] ">
                                            <div className="flex flex-col gap-0 h-[100%] justify-between">
                                                <h2 className="font-bold text-foreground/90 text-4xl flex gap-1 items-center justify-between">
                                                    {us3er.name}{" "}
                                                    {us3er.name === "Kevin" && (
                                                        <IoCodeSlash className="text-primary" />
                                                    )}
                                                </h2>

                                                <div className="align-bottom mt-2 sm:mt-0">
                                                    <p className="text-foreground/80 text-2xl">
                                                        {us3er.email}
                                                    </p>

                                                    <p className="text-foreground/80 text-2xl">
                                                        <span>
                                                            {t("joined")}:{" "}
                                                        </span>
                                                        {format({
                                                            date: us3er?.xata
                                                                ?.createdAt,
                                                            format: "full",
                                                            locale: locale,
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>{" "}
            </div>
        </>
    );
}

export default Collections;
