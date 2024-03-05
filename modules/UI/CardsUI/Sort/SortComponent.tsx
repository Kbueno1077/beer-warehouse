"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { TbFlagDown, TbFlagUp } from "react-icons/tb";
import {
    BiSolidDownArrowAlt,
    BiSolidUpArrowAlt,
    BiSortAZ,
    BiSortZA,
} from "react-icons/bi";
import { useTranslations } from "next-intl";

export default function SortComponent({ handleSort, selectedSort }: any) {
    const t = useTranslations("cards.sort");

    return (
        <>
            <Button
                onPress={() => {
                    handleSort({ attribute: "country", direction: "up" });
                }}
                color="primary"
                variant={
                    selectedSort.attribute === "country" &&
                    selectedSort.direction === "up"
                        ? "bordered"
                        : "faded"
                }
                isIconOnly
                aria-label="Country Up"
            >
                <TbFlagUp />
            </Button>

            <Button
                onPress={() => {
                    handleSort({ attribute: "country", direction: "down" });
                }}
                color="primary"
                variant={
                    selectedSort.attribute === "country" &&
                    selectedSort.direction === "down"
                        ? "bordered"
                        : "faded"
                }
                isIconOnly
                aria-label="Country Down"
            >
                <TbFlagDown />
            </Button>

            <Button
                onPress={() => {
                    handleSort({ attribute: "name", direction: "up" });
                }}
                color="primary"
                variant={
                    selectedSort.attribute === "name" &&
                    selectedSort.direction === "up"
                        ? "bordered"
                        : "faded"
                }
                isIconOnly
                aria-label="Alphabetical Up"
            >
                <BiSortAZ />
            </Button>

            <Button
                onPress={() => {
                    handleSort({ attribute: "name", direction: "down" });
                }}
                color="primary"
                variant={
                    selectedSort.attribute === "name" &&
                    selectedSort.direction === "down"
                        ? "bordered"
                        : "faded"
                }
                isIconOnly
                aria-label="Alphabetical Down"
            >
                <BiSortZA />
            </Button>

            <Button
                onPress={() => {
                    handleSort({
                        attribute: "alcohol_percentage",
                        direction: "up",
                    });
                }}
                color="primary"
                variant={
                    selectedSort.attribute === "alcohol_percentage" &&
                    selectedSort.direction === "up"
                        ? "bordered"
                        : "faded"
                }
                aria-label="ABV Up"
            >
                {t("abv")} <BiSolidUpArrowAlt />
            </Button>

            <Button
                onPress={() => {
                    handleSort({
                        attribute: "alcohol_percentage",
                        direction: "down",
                    });
                }}
                color="primary"
                variant={
                    selectedSort.attribute === "alcohol_percentage" &&
                    selectedSort.direction === "down"
                        ? "bordered"
                        : "faded"
                }
                aria-label="ABV Down"
            >
                {t("abv")} <BiSolidDownArrowAlt />
            </Button>

            <Button
                onPress={() => {
                    handleSort({ attribute: "ml", direction: "up" });
                }}
                color="primary"
                variant={
                    selectedSort.attribute === "ml" &&
                    selectedSort.direction === "up"
                        ? "bordered"
                        : "faded"
                }
                aria-label="ML Up"
            >
                {t("ml")} <BiSolidUpArrowAlt />
            </Button>

            <Button
                onPress={() => {
                    handleSort({ attribute: "ml", direction: "down" });
                }}
                color="primary"
                variant={
                    selectedSort.attribute === "ml" &&
                    selectedSort.direction === "down"
                        ? "bordered"
                        : "faded"
                }
                aria-label="ML Down"
            >
                {t("ml")} <BiSolidDownArrowAlt />
            </Button>

            <Button
                onPress={() => {
                    handleSort({ attribute: "bought_in", direction: "up" });
                }}
                color="primary"
                variant={
                    selectedSort.attribute === "bought_in" &&
                    selectedSort.direction === "up"
                        ? "bordered"
                        : "faded"
                }
                aria-label="Bought in Up"
            >
                <BiSolidUpArrowAlt /> {t("bought in")}
            </Button>

            <Button
                onPress={() => {
                    handleSort({ attribute: "bought_in", direction: "down" });
                }}
                color="primary"
                variant={
                    selectedSort.attribute === "bought_in" &&
                    selectedSort.direction === "down"
                        ? "bordered"
                        : "faded"
                }
                aria-label="BoughtDown"
            >
                <BiSolidDownArrowAlt /> {t("bought in")}
            </Button>

            {/*<Button onPress={() => {*/}
            {/*    handleSort({attribute: 'initial_impression', direction: 'up'})*/}
            {/*}} color='primary'*/}
            {/*        variant={selectedSort.attribute === 'initial_impression' && selectedSort.direction === 'up' ? 'bordered' : 'faded'}*/}
            {/*        aria-label="Impression Up">*/}
            {/*    <BiSolidUpArrowAlt/> Impression*/}
            {/*</Button>*/}

            {/*<Button onPress={() => {*/}
            {/*    handleSort({attribute: 'initial_impression', direction: 'down'})*/}
            {/*}} color='primary'*/}
            {/*        variant={selectedSort.attribute === 'initial_impression' && selectedSort.direction === 'down' ? 'bordered' : 'faded'}*/}
            {/*        aria-label="Impression Down">*/}
            {/*    <BiSolidDownArrowAlt/> Impression*/}
            {/*</Button>*/}

            <Button
                onPress={() => {
                    handleSort({ attribute: "", direction: "" });
                }}
                color="primary"
                variant="faded"
                aria-label="Clear Sorting"
            >
                {t("clear")}
            </Button>
        </>
    );
}
