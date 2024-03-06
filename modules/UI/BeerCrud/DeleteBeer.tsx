import React, { useState } from "react";

import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import { MdDeleteOutline } from "react-icons/md";
import { BeerType } from "@/util/types";
import axios from "axios";
import { useBeerStore } from "@/store/zustand";
import { enqueueSnackbar } from "notistack";
import Spinner from "@/components/Loaders/Spinner";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

interface DeleteBeerProps {
    selectedBeer: BeerType;
    isOwner: boolean;
}

export default function DeleteBeer({ selectedBeer, isOwner }: DeleteBeerProps) {
    const { data: session } = useSession();
    const user = session?.user;

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { deleteBeerUI } = useBeerStore();
    const t = useTranslations("beerCrud");

    const deleteBeer = async () => {
        setIsLoading(true);
        const id = selectedBeer.id;
        let evidence_public_id = "";

        if (selectedBeer.evidence_img) {
            evidence_public_id = selectedBeer.evidence_img
                .split("/")
                .slice(-2)
                .join("/")
                .split(".")[0];
        }

        try {
            const {
                data: { record, error },
            } = await axios.delete(`/api/beer`, {
                params: {
                    id,
                    evidence_public_id,
                    owner: user?.name ?? "",
                },
            });

            if (error) {
                throw new Error(error);
            }

            if (record) {
                deleteBeerUI(record.id);
            }

            enqueueSnackbar(t("remove-good-message"), { variant: "default" });
        } catch (error: any) {
            enqueueSnackbar(`Error: ${error?.response?.data.errorMessage}`, {
                variant: "error",
            });
            console.error(error);
        }

        setIsLoading(false);
    };

    return (
        <>
            {user && isOwner && (
                <Button
                    size={"sm"}
                    onPress={onOpen}
                    isIconOnly
                    color="danger"
                    aria-label={t("remove-aria")}
                >
                    <MdDeleteOutline className="h-[17px] w-[17px]" />
                </Button>
            )}

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {t("confirm remove-title")}
                            </ModalHeader>
                            <ModalBody>
                                <p>{t("confirm remove-body")}</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    {t("no")}
                                </Button>
                                <Button color="primary" onPress={deleteBeer}>
                                    {!isLoading ? (
                                        t("yes")
                                    ) : (
                                        <div>
                                            <Spinner />
                                        </div>
                                    )}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
