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
import React, { useState } from "react";

import { CustomSelect, StateOption } from "@/components/CustomSelect/Select";
import boughtCountries from "@/util/boughtCountries.json";
import countriesJson from "@/util/countries.json";
import { BeerType } from "@/util/types";
import { Input } from "@nextui-org/input";
import { MdEdit } from "react-icons/md";
import { OnChangeValue } from "react-select";
import DropZone from "./DropZone";

import Spinner from "@/components/Loaders/Spinner";
import { useBearContext } from "@/store/useBeerContext";
import impressionJson from "@/util/impression.json";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { enqueueSnackbar } from "notistack";

interface UpdateBeerProps {
    selectedBeer: BeerType;
    isOwner: boolean;
}

export default function UpdateBeer({ selectedBeer, isOwner }: UpdateBeerProps) {
    const { data: session } = useSession();
    const user = session?.user;
    const t = useTranslations("beerCrud");
    const tcountries = useTranslations("countries");
    const timpression = useTranslations("impression");

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [name, setName] = React.useState<string>(selectedBeer.name ?? "");
    const [alcohol_percentage, setAlcohol] = React.useState<string>(
        selectedBeer.alcohol_percentage.toString()
    );
    const [ml, setMl] = React.useState<string>(selectedBeer.ml.toString());

    const [country, setCountry] = React.useState<any>(
        selectedBeer && selectedBeer.country !== "TBD"
            ? {
                  value: selectedBeer.country,
                  // @ts-ignore
                  label: countriesJson[selectedBeer.country],
              }
            : null
    );

    const [bought_in, setBoughtIn] = React.useState<any>(
        selectedBeer && selectedBeer.country !== "TBD"
            ? {
                  value: selectedBeer.bought_in,
                  // @ts-ignore
                  label: boughtCountries[selectedBeer.bought_in],
              }
            : null
    );

    const [initial_impression, setImpression] = React.useState<any>(
        new Set([])
    );
    const [additional_comments, setComments] = React.useState<string>(
        selectedBeer.additional_comments || ""
    );

    const currentEvidenceImage = selectedBeer.evidence_img || "";

    const [evidenceFiles, setEvidenceFiles] = useState<Array<File>>([]);

    const { theme, resolvedTheme } = useTheme();
    const { updateBeerUI } = useBearContext((s) => {
        return {
            updateBeerUI: s.updateBeerUI,
        };
    });

    const handleOpening = () => {
        setEvidenceFiles([]);
        onOpen();
    };

    const handleFiles = (zone: string, files: Array<File>) => {
        if (zone === "evidence_img") {
            setEvidenceFiles(files);
        }
    };

    const handleActions = (
        selectedOption: OnChangeValue<StateOption, false>
    ) => {
        setCountry(selectedOption);
    };

    const handleBoughtActions = (
        selectedOption: OnChangeValue<StateOption, false>
    ) => {
        setBoughtIn(selectedOption);
    };

    const editBeer = async () => {
        setIsLoading(true);
        let cloudinaryResponse: any = { data: { secure_url: "" } };

        try {
            if (evidenceFiles.length > 0) {
                console.log("UPLOADING PHOTO");
                cloudinaryResponse = await uploadImage();
            }

            if (name) {
                await editBeerXata(
                    cloudinaryResponse?.data?.secure_url ||
                        currentEvidenceImage,
                    !!cloudinaryResponse?.data?.secure_url
                );
            }

            setIsLoading(false);
            enqueueSnackbar(t("edited-good-message"), { variant: "default" });
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

        const url = "https://api.cloudinary.com/v1_1/dub477vzt/upload";
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

    const editBeerXata = async (
        evidence_url: string,
        changeOfPicture: boolean
    ) => {
        const alcoholNumber = parseFloat(alcohol_percentage);
        const mlNumber = parseFloat(ml);

        let evidence_public_id = "";

        if (evidence_url && selectedBeer.evidence_img && changeOfPicture) {
            evidence_public_id = selectedBeer.evidence_img
                .split("/")
                .slice(-2)
                .join("/")
                .split(".")[0];
        }

        const {
            data: { record, error },
        } = await axios.put("/api/beer", {
            id: selectedBeer.id,
            name,
            alcohol_percentage:
                alcoholNumber !== Number.NaN ? alcoholNumber : 0,
            ml: mlNumber !== Number.NaN ? mlNumber : 0,
            country: country?.value || "",
            initial_impression:
                initial_impression.currentKey ??
                selectedBeer.initial_impression,
            bought_in: bought_in.value ?? "",
            evidence_img: evidence_url ?? "",
            additional_comments,
            evidence_public_id,
            owner: user?.name ?? "",
        });

        if (error) {
            throw new Error(error);
        }

        if (record) {
            updateBeerUI(record);
            onOpenChange();
        }
    };

    return (
        <>
            {user && isOwner && (
                <Button
                    size={"sm"}
                    variant="faded"
                    onPress={handleOpening}
                    isIconOnly
                    color="danger"
                    aria-label={t("edit-addBtn-aria")}
                >
                    <MdEdit className="h-[17px] w-[17px]" />
                </Button>
            )}

            <Modal
                scrollBehavior="inside"
                size="5xl"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent className="pt-10">
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
                                                    currentImg={
                                                        currentEvidenceImage
                                                    }
                                                    handleFiles={handleFiles}
                                                />
                                            </Tab>
                                        </Tabs>
                                    </div>

                                    <div className="mt-4 sm:mt-0 w-full flex flex-col gap-3">
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
                                            theme={resolvedTheme}
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
                                            onChange={handleActions}
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
                                            theme={resolvedTheme}
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
                                            onChange={handleBoughtActions}
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
                                            size={"md"}
                                            defaultSelectedKeys={[
                                                selectedBeer.initial_impression ??
                                                    "",
                                            ]}
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
                                <Button onPress={editBeer} color="primary">
                                    {!isLoading ? (
                                        t("edit")
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
