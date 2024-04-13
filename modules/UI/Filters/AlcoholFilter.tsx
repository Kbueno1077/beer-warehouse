"use client";

import React from "react";
import {
    Button,
    CheckboxGroup,
    Chip,
    tv,
    useCheckbox,
    VisuallyHidden,
} from "@nextui-org/react";
import { alcoholOptions } from "@/modules/UI/TableUI/DataTable/data";
import { AiOutlineClose } from "react-icons/ai";
import { useTranslations } from "next-intl";
import { useBearContext } from "@/store/useBeerContext";

export default function AlcoholFilter({ handleFilters }: any) {
    const { filters } = useBearContext((s) => {
        return {
            filters: s.filters,
        };
    });
    const [groupSelected, setGroupSelected] = React.useState(
        filters.alcoholFilters
    );
    const t = useTranslations("filters");

    const handleGroupSelected = (e: any) => {
        if (e.length > 0) {
            setGroupSelected(e);
            handleFilters("alcoholFilters", e);
        }
    };

    const removeFilter = () => {
        setGroupSelected(["soft", "normal", "high", "extra", "hardcore"]);
        handleFilters("alcoholFilters", [
            "soft",
            "normal",
            "high",
            "extra",
            "hardcore",
        ]);
    };

    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between">
                <h4 className="text-gray-500">{t("alcohol")}</h4>
                <Button
                    size={"sm"}
                    onClick={removeFilter}
                    isIconOnly
                    variant={"light"}
                    aria-label={t("alcohol-aria")}
                >
                    <AiOutlineClose />
                </Button>
            </div>

            <CheckboxGroup
                className="gap-1"
                orientation="horizontal"
                value={groupSelected}
                onChange={handleGroupSelected}
            >
                <div className="flex flex-wrap gap-1">
                    {alcoholOptions.map((option) => (
                        <CustomCheckbox key={option.uid} value={option.name}>
                            {t(option.name)}
                        </CustomCheckbox>
                    ))}
                </div>
            </CheckboxGroup>
        </div>
    );
}

export const CheckIcon = (props: any) => (
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
        width="1em"
        {...props}
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const checkbox = tv({
    slots: {
        base: "border-default hover:bg-default-200",
        content: "text-default-500",
    },
    variants: {
        isSelected: {
            true: {
                base: "border-primary bg-primary hover:bg-primary-500 hover:border-primary-500",
                content: "text-primary-foreground pl-1",
            },
        },
        isFocusVisible: {
            true: {
                base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
            },
        },
    },
});

export const CustomCheckbox = (props: any) => {
    const {
        children,
        isSelected,
        isFocusVisible,
        getBaseProps,
        getLabelProps,
        getInputProps,
    } = useCheckbox({
        ...props,
    });

    const styles = checkbox({ isSelected, isFocusVisible });

    return (
        <label {...getBaseProps()}>
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <Chip
                classNames={{
                    base: styles.base(),
                    content: styles.content(),
                }}
                color="primary"
                startContent={
                    isSelected ? <CheckIcon className="ml-1" /> : null
                }
                variant="faded"
                {...getLabelProps()}
            >
                {children ? children : isSelected ? "Enabled" : "Disabled"}
            </Chip>
        </label>
    );
};
