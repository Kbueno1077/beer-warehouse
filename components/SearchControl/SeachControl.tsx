"use client";

import { useBearContext } from "@/store/useBeerContext";
import { defaultPromtResponse } from "@/util/geminiApi";
import { CARD_MODE } from "@/util/types";
import {
    Avatar,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { WiStars } from "react-icons/wi";
import styles from "../../modules/UI/CardsUI/SearchControls/searchControls.module.css";
import Spinner from "../Loaders/Spinner";

function SeachControl({ isTable = false }) {
    const locale = useLocale();
    const t = useTranslations("search");
    const [withAi, setWithAi] = useState(false);
    const [value, setValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState("");
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const { mode, filters, changeFilters, warehouseOwner } = useBearContext(
        (s) => {
            return {
                mode: s.mode,
                filters: s.filters,
                changeFilters: s.changeFilters,
                warehouseOwner: s.warehouseOwner,
            };
        }
    );

    const onValueChange = (eValue: string) => {
        setValue(eValue);
        if (!withAi) {
            changeFilters({ ...filters, search: eValue });
        }
    };

    const onAiChange = () => {
        if (withAi) {
            changeFilters({ ...filters, search: value });
        }

        setWithAi(!withAi);
    };

    if (mode !== CARD_MODE && !isTable) return null;

    const makeRequestToGemini = async () => {
        setIsLoading(true);
        if (value === "") {
            setAiResponse(defaultPromtResponse);
            onOpen();
            setIsLoading(false);
            return;
        }

        const response = await axios.post("/api/gemini-beer/", {
            prompt: value,
            locale,
        });

        console.log(response.data);
        setAiResponse(response.data.content || "N/A");
        console.log(response);

        onOpen();
        setIsLoading(false);
    };

    const handleOnClose = () => {
        setAiResponse("");
        onClose();
    };

    return (
        <>
            <div className="w-full flex items-center gap-2">
                <Input
                    className="w-full"
                    disabled={isLoading}
                    startContent={
                        !isTable && (
                            <Avatar
                                size={"sm"}
                                isBordered
                                as="button"
                                className="transition-transform mr-3 w-[42px] md:w-[35px]"
                                src={warehouseOwner?.image || "/noUser.png"}
                            />
                        )
                    }
                    endContent={
                        !isTable && (
                            <div className="flex gap-2 items-center">
                                {withAi && !isLoading && (
                                    <Button
                                        isIconOnly
                                        variant="ghost"
                                        onClick={makeRequestToGemini}
                                    >
                                        <IoSend />
                                    </Button>
                                )}

                                {isLoading && <Spinner />}

                                <Button
                                    isIconOnly
                                    onClick={onAiChange}
                                    variant={`faded`}
                                    className={`${withAi ? "bg-primary" : ""}`}
                                >
                                    <WiStars size={25} />
                                </Button>
                            </div>
                        )
                    }
                    color={"default"}
                    placeholder={t("search.placeholder")}
                    label={""}
                    size={isTable ? "md" : "lg"}
                    value={value}
                    onValueChange={onValueChange}
                    classNames={{
                        label: styles.labelColor,
                        inputWrapper: `bg-opacity-90 ${
                            isTable && "border-1 h-[40px"
                        }`,
                        base: `${isTable && "w-full sm:max-w-[44%]"}`,
                    }}
                    isClearable={isTable}
                />

                {isTable && (
                    <div className="flex gap-2 items-center">
                        {withAi && !isLoading && (
                            <Button
                                isIconOnly
                                variant="ghost"
                                onClick={makeRequestToGemini}
                            >
                                <IoSend />
                            </Button>
                        )}

                        {isLoading && <Spinner />}

                        <Button
                            isIconOnly
                            onClick={onAiChange}
                            variant={`faded`}
                            className={`${withAi ? "bg-primary" : ""}`}
                        >
                            <WiStars size={25} />
                        </Button>
                    </div>
                )}
            </div>

            <Modal
                scrollBehavior="inside"
                size="5xl"
                isOpen={isOpen}
                onClose={handleOnClose}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    <ModalHeader>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1">
                                <h2>{t("ai-result")}</h2>

                                <WiStars size={25} />
                            </div>

                            <p>{t("ai-disclaimer")}</p>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div style={{ whiteSpace: "pre-line" }}>
                            <div
                                dangerouslySetInnerHTML={{ __html: aiResponse }}
                            ></div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleOnClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default SeachControl;
