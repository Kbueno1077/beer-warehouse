"use client";

import { NextauthUser } from "@next-auth/xata-adapter/dist/xata";
import { parse, format } from "@formkit/tempo";

import { Card, CardBody, Image } from "@nextui-org/react";
import { IoCodeSlash } from "react-icons/io5";
import { useLocale, useTranslations } from "next-intl";
import { useBearContext } from "@/store/useBeerContext";
import { useSession } from "next-auth/react";

interface NextAuthUserExtended extends NextauthUser {
    id: string;
    xata: { createdAt: Date; updatedAt: Date };
}

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

    const handleWarehouse = async (username: string) => {
        const newWarehouse = await handleWarehouseChange(username);
    };

    return (
        <>
            <div className="w-full flex justify-center mt-5 sm:mt-10">
                <div className="p-2 pb-4 flex gap-4 flex-col items-center sm:items-stretch md:flex-row flex-wrap justify-center w-full max-w-[3000px]">
                    <h1 className="text-4xl font-bold">
                        You are looking the {'"'}
                        {warehouseOwner}
                        {'"'} collection
                    </h1>
                    <div></div>
                </div>
            </div>

            <div className="w-full flex justify-center sm:mt-5">
                <div className="p-2 pb-4 flex gap-4 flex-col items-center sm:items-stretch md:flex-row flex-wrap justify-center w-full max-w-[3000px]">
                    {users.map((user, index) => (
                        <Card
                            key={user.id}
                            isBlurred
                            className="border-none cursor-pointer bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                            shadow="sm"
                            isPressable={true}
                            onPress={() => {
                                handleWarehouse(user.name ?? "");
                            }}
                        >
                            <CardBody className="sm:flex sm:justify-center sm:item-center">
                                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                                    <div className="relative col-span-6 md:col-span-4">
                                        <Image
                                            alt="Album cover"
                                            className="object-cover"
                                            height={200}
                                            shadow="md"
                                            src={user.image ?? ""}
                                            width="100%"
                                        />
                                    </div>

                                    <div className="flex flex-col col-span-6 md:col-span-8 h-[100%] ">
                                        <div className="flex justify-between items-start h-[100%] ">
                                            <div className="flex flex-col gap-0 h-[100%] justify-between">
                                                <h2 className="font-bold text-foreground/90 text-4xl flex gap-1 items-center justify-between">
                                                    {user.name}{" "}
                                                    {user.name === "Kevin" && (
                                                        <IoCodeSlash className="text-primary" />
                                                    )}
                                                </h2>

                                                <div className="align-bottom mt-2 sm:mt-0">
                                                    <p className="text-foreground/80 text-2xl">
                                                        {user.email}
                                                    </p>

                                                    <p className="text-foreground/80 text-2xl">
                                                        <span>
                                                            {t("joined")}:{" "}
                                                        </span>
                                                        {format({
                                                            date: user?.xata
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
