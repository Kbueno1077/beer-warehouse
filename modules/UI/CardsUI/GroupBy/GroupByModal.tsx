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
import { GroupByType } from "@/store/zustand";
import GroupByComponent from "@/modules/UI/CardsUI/GroupBy/GroupByComponent";
import { useTranslations } from "next-intl";
import { useBearContext } from "@/store/useBeerContext";

export default function GroupByModal() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { groupBy, changeGroupBy } = useBearContext((s) => {
        return {
            groupBy: s.groupBy,
            changeGroupBy: s.changeGroupBy,
        };
    });

    const [selectedGroupBy, setSelectedGroupBy] = React.useState(groupBy);
    const t = useTranslations("cards.groupBy");

    const handleGroupBy = (sort: GroupByType) => {
        setSelectedGroupBy(sort);
    };

    const handleClose = () => {
        setSelectedGroupBy(groupBy);
        onClose();
    };

    const cancelGroups = () => {
        handleClose();
    };

    const applyGroups = () => {
        changeGroupBy(selectedGroupBy);
        onClose();
    };

    return (
        <>
            <Button
                color="primary"
                onPress={onOpen}
                variant="faded"
                aria-label={t("btn-aria")}
            >
                <PiSortAscendingBold className="w-4 h-4" /> {t("title")}{" "}
                {groupBy !== "" ? " *" : ""}
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
                                <GroupByComponent
                                    handleGroupBy={handleGroupBy}
                                    selectedGroupBy={selectedGroupBy}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={() => cancelGroups()}
                                >
                                    {t("cancel")}
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={() => applyGroups()}
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
