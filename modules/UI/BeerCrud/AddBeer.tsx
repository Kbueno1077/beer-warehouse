import React, { useState } from "react";
import {
    Avatar,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    Tab,
    Tabs,
    Textarea,
    useDisclosure,
} from "@nextui-org/react";

import { PlusIcon } from "@/modules/UI/TableUI/DataTable/TableIcons";
import { Input } from "@nextui-org/input";
import DropZone from "./DropZone";
import { CustomSelect, StateOption } from "@/components/CustomSelect/Select";
import countriesJson from "@/util/countries.json";
import boughtCountries from "@/util/boughtCountries.json";
import impressionJson from "@/util/impression.json";

import { OnChangeValue } from "react-select";
import axios from "axios";
import { useBeerStore } from "@/store/zustand";
import { enqueueSnackbar } from "notistack";
import Spinner from "@/components/Loaders/Spinner";
import { checkSession } from "@/util/javascript";
import { CARD_MODE } from "@/util/types";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";

export default function AddBeer() {
    const { data: session } = useSession();
    const user = session?.user;

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { theme, addBeerUI, mode } = useBeerStore();
    const t = useTranslations("beerCrud");
    const tcountries = useTranslations("countries");
    const timpression = useTranslations("impression");

    const [name, setName] = React.useState<string>("");
    const [alcohol_percentage, setAlcohol] = React.useState<string>("");
    const [ml, setMl] = React.useState<string>("");
    const [country, setCountry] = React.useState<any>(null);
    const [bought_in, setBought] = React.useState<any>(null);
    const [initial_impression, setImpression] = React.useState<any>(
        new Set([])
    );
    const [additional_comments, setComments] = React.useState<string>("");
    const [evidenceFiles, setEvidenceFiles] = useState<Array<File>>([]);

    const handleOpening = () => {
        setDefaultFormState();
        onOpen();
    };

    const setDefaultFormState = () => {
        setName("");
        setAlcohol("");
        setMl("");
        setCountry(null);
        setBought(null);
        setImpression(new Set([]));
        setComments("");
        setEvidenceFiles([]);
        setIsLoading(false);
    };

    const handleFiles = (zone: string, files: Array<File>) => {
        if (zone === "evidence_img") {
            setEvidenceFiles(files);
        }
    };

    const handleCountryActions = (
        selectedOption: OnChangeValue<StateOption, false>
    ) => {
        setCountry(selectedOption);
    };

    const handleBoughtIn = (
        selectedOption: OnChangeValue<StateOption, false>
    ) => {
        setBought(selectedOption);
    };

    const InsertBeer = async () => {
        setIsLoading(true);
        let cloudinaryResponse: any = { data: { secure_url: "" } };

        try {
            await checkSession();

            if (evidenceFiles.length > 0) {
                cloudinaryResponse = await uploadImage();
            }

            if (name) {
                await insertBeerXata(
                    cloudinaryResponse?.data?.secure_url || ""
                );
            }

            setDefaultFormState();
            enqueueSnackbar(t("add-good-message"), { variant: "success" });
        } catch (error: any) {
            console.error(error);
            enqueueSnackbar(`Error: ${error?.response?.data.errorMessage}`, {
                variant: "error",
            });
            setIsLoading(false);
        }
    };

    const uploadImage = async () => {
        const {
            data: { signature, timestamp, error },
        } = await axios.post("/api/cloudinary", {
            folder: `${process.env.CLOUDINARY_BEER_FOLDER}/${
                user?.name === "Kevin" ? "my-beers" : user?.name
            }`,
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
            filename_override: name,
            public_id: name,
        });

        if (error) {
            throw new Error(error);
        }

        const url = process.env.CLOUDINARTY_URL ?? "";
        const formData = new FormData();
        formData.append("file", evidenceFiles[0]);
        formData.append("upload_preset", "ul1f0lm9");
        formData.append(
            "folder",
            `${process.env.CLOUDINARY_BEER_FOLDER}/${
                user?.name === "Kevin" ? "my-beers" : user?.name
            }`
        );
        formData.append("filename_override", name);
        formData.append("public_id", name);
        formData.append("timestamp", timestamp);
        formData.append("owner", user?.name ?? "");
        // formData.append('signature', signature);
        formData.append("api_key", "763641954252769");
        return await axios.post(url, formData);
    };

    const insertBeerXata = async (evidence_url: string) => {
        const alcoholNumber = parseFloat(alcohol_percentage);
        const mlNumber = parseFloat(ml);

        const {
            data: { record, error },
        } = await axios.post("/api/beer", {
            name,
            alcohol_percentage: alcohol_percentage ? alcoholNumber : 0,
            ml: ml ? mlNumber : 0,
            country: country?.value ?? "TBD",
            initial_impression: initial_impression.currentKey ?? "Average",
            bought_in: bought_in.value ?? "",
            evidence_img: evidence_url ?? "",
            additional_comments,
            owner: user?.name,
        });

        if (error) {
            throw new Error(error);
        }

        if (record) {
            addBeerUI(record);
        }
    };

    return (
        <>
            <Button
                className="bg-foreground text-background"
                onPress={handleOpening}
                isIconOnly={mode === CARD_MODE}
                endContent={<PlusIcon />}
                size="sm"
                aria-label={t("add-addBtn-aria")}
            >
                {mode !== CARD_MODE && t("addBtn")}
            </Button>

            <Modal
                scrollBehavior="inside"
                size="5xl"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent className="pt-10 pb-2">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <Input
                                    fullWidth={true}
                                    label={t("name")}
                                    value={name}
                                    onValueChange={setName}
                                />
                            </ModalHeader>

                            <ModalBody>
                                <div className="sm:flex gap-5">
                                    <div>
                                        <Tabs
                                            fullWidth={true}
                                            aria-label="Dynamic tabs"
                                        >
                                            <Tab
                                                key="evidence"
                                                title={t("evidence-img")}
                                            >
                                                <DropZone
                                                    zone="evidence_img"
                                                    files={evidenceFiles}
                                                    handleFiles={handleFiles}
                                                />
                                            </Tab>
                                        </Tabs>
                                    </div>

                                    <div className="w-full flex flex-col gap-3">
                                        <Input
                                            fullWidth={true}
                                            label={t("alcohol")}
                                            type="number"
                                            value={alcohol_percentage}
                                            onValueChange={setAlcohol}
                                        />

                                        <Input
                                            fullWidth={true}
                                            type="number"
                                            label={t("ml")}
                                            value={ml}
                                            onValueChange={setMl}
                                        />

                                        <CustomSelect
                                            theme={theme}
                                            placeholder={t("country")}
                                            decorationPlacement="start"
                                            decoration={
                                                <Avatar
                                                    alt="country flag"
                                                    className="w-6 h-6"
                                                    classNames={{
                                                        img: "center",
                                                    }}
                                                />
                                            }
                                            value={country}
                                            onChange={handleCountryActions}
                                            closeMenuOnSelect={false}
                                            options={Object.entries(
                                                countriesJson
                                            ).map((entry) => {
                                                return {
                                                    value: entry[0],
                                                    label: tcountries(entry[1]),
                                                };
                                            })}
                                        />

                                        <CustomSelect
                                            theme={theme}
                                            placeholder={t("bought in")}
                                            decorationPlacement="start"
                                            decoration={
                                                <Avatar
                                                    alt="country flag"
                                                    className="w-6 h-6"
                                                    classNames={{
                                                        img: "center",
                                                    }}
                                                />
                                            }
                                            value={bought_in}
                                            onChange={handleBoughtIn}
                                            closeMenuOnSelect={false}
                                            options={Object.entries(
                                                boughtCountries
                                            ).map((entry) => {
                                                return {
                                                    value: entry[0],
                                                    label: tcountries(entry[1]),
                                                };
                                            })}
                                        />

                                        <Select
                                            label={t("impression")}
                                            value={initial_impression}
                                            onSelectionChange={setImpression}
                                            defaultSelectedKeys={["Average"]}
                                            size={"md"}
                                            disallowEmptySelection
                                        >
                                            {Object.entries(impressionJson).map(
                                                (entry) => (
                                                    <SelectItem
                                                        key={entry[1]}
                                                        value={entry[1]}
                                                    >
                                                        {timpression(entry[1])}
                                                    </SelectItem>
                                                )
                                            )}
                                        </Select>
                                    </div>
                                </div>

                                <div className="w-full mb-5">
                                    <Textarea
                                        label={t("comments")}
                                        value={additional_comments}
                                        onValueChange={setComments}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    onPress={onClose}
                                    variant="light"
                                >
                                    {t("cancel")}
                                </Button>
                                <Button onPress={InsertBeer} color="primary">
                                    {!isLoading ? (
                                        t("add")
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
