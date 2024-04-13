"use client";

import React from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";

import { PiSortAscendingBold } from "react-icons/pi";
import { SortType } from "@/store/zustand";
import SortComponent from "@/modules/UI/CardsUI/Sort/SortComponent";
import { useTranslations } from "next-intl";
import { useBearContext } from "@/store/useBeerContext";

export default function SortModal() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { sort, changeSort } = useBearContext((s) => {
        return {
            sort: s.sort,
            changeSort: s.changeSort,
        };
    });

    const [selectedSort, setSelectedSort] = React.useState(sort);
    const t = useTranslations("cards.sort");

    const handleSort = (sort: SortType) => {
        setSelectedSort(sort);
    };

    const handleClose = () => {
        setSelectedSort(sort);
        onClose();
    };

    const cancelSort = () => {
        handleClose();
    };

    const applySort = () => {
        changeSort(selectedSort);
        onClose();
    };

    return (
        <>
            <Button
                color="primary"
                onPress={onOpen}
                variant="faded"
                aria-label="Open Sort Modal"
            >
                <PiSortAscendingBold className="w-4 h-4" /> {t("title")}{" "}
                {sort.attribute !== "" ? " *" : ""}
            </Button>

            <Modal
                size="2xl"
                isOpen={isOpen}
                onClose={handleClose}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-row gap-1">
                                {t("title")}
                            </ModalHeader>
                            <ModalBody className="flex flex-row justify-center gap-2 flex-wrap">
                                <SortComponent
                                    handleSort={handleSort}
                                    selectedSort={selectedSort}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={() => cancelSort()}
                                >
                                    {t("cancel")}
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={() => applySort()}
                                >
                                    {t("apply")}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
