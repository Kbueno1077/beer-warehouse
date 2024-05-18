//@ts-nocheck
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineSaveAlt } from "react-icons/md";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import { Button, Image } from "@nextui-org/react";
import NextImage from "next/image";
import { useTranslations } from "next-intl";

type DropZonePorps = {
    zone: string;
    files: Array<File>;
    handleFiles: Function;
    currentImg?: string;
};

function DropZone({
    zone,
    files,
    handleFiles,
    currentImg = "",
}: DropZonePorps) {
    const [seeImage, setSeeImage] = useState<boolean>(!!currentImg);
    const t = useTranslations("beerCrud");

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            setSeeImage(true);
            handleFiles(
                zone,
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
            setSeeImage(true);
        },

        maxFiles: 1,
        multiple: false,

        onError: (error) => {
            console.error(error);
        },
    });

    const toggleSeeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setSeeImage(!seeImage);
    };

    const images = files.map((file) => (
        <Image
            key={file.name}
            as={NextImage}
            isZoomed
            width={262}
            height={262}
            objectFit="cover"
            alt="preview"
            src={file.preview}
        />
    ));

    const selectedBeerImg = (
        <Image
            key={"Current Image"}
            as={NextImage}
            objectFit="cover"
            isZoomed
            width={262}
            height={262}
            alt="preview"
            src={currentImg}
        />
    );

    return (
        <div
            {...getRootProps()}
            className="relative h-[350px] w-full sm:h-[400px] sm:w-[300px] bg-[#CBDCE3] text-[#6E8A8E] border border-dotted border-sky-500 rounded-large flex flex-col justify-center align-middle items-center"
        >
            <input {...getInputProps()} />

            {!seeImage && (
                <>
                    <MdOutlineSaveAlt className="w-8 h-8 mb-2 text-center" />
                    <p className="px-2">
                        <strong>{t("choose file")}</strong> {t("drag file")}
                    </p>
                    <p className="px-2 text-center">
                        {zone === "evidence_img"
                            ? t("evidence-img")
                            : t("preview-img")}
                    </p>
                    {files.length > 0 && (
                        <p className="mt-2 px-2 text-center">
                            {t("save image")}
                        </p>
                    )}
                </>
            )}

            {files.length > 0 || currentImg ? (
                <>
                    {seeImage && (
                        <div className="relative h-[350px] w-full sm:h-[400px] sm:w-[300px] mx-auto overflow-hidden">
                            {files.length > 0
                                ? images
                                : currentImg
                                ? selectedBeerImg
                                : ""}
                        </div>
                    )}

                    <div className="position absolute right-2 bottom-2 z-20 ">
                        {!seeImage ? (
                            <Button
                                isIconOnly
                                disableRipple
                                variant="faded"
                                onClick={toggleSeeImage}
                            >
                                <PiEye className="h-4 w-4 " />
                            </Button>
                        ) : (
                            <Button
                                isIconOnly
                                disableRipple
                                variant="faded"
                                onClick={toggleSeeImage}
                            >
                                <PiEyeSlash className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </>
            ) : null}
        </div>
    );
}

export default DropZone;
