import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import {
    BiSolidDownArrowAlt,
    BiSolidUpArrowAlt,
    BiSortAZ,
    BiSortZA,
} from "react-icons/bi";
import { TbFlagDown, TbFlagUp } from "react-icons/tb";

export default function SortComponent({ handleSort, selectedSort }: any) {
    const t = useTranslations("cards.sort");

    return (
        <>
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
                    handleSort({
                        attribute: "initial_impression",
                        direction: "up",
                    });
                }}
                color="primary"
                variant={
                    selectedSort.attribute === "initial_impression" &&
                    selectedSort.direction === "up"
                        ? "bordered"
                        : "faded"
                }
                aria-label="Impression Up"
            >
                <BiSolidUpArrowAlt /> Impression
            </Button>

            <Button
                onPress={() => {
                    handleSort({
                        attribute: "initial_impression",
                        direction: "down",
                    });
                }}
                color="primary"
                variant={
                    selectedSort.attribute === "initial_impression" &&
                    selectedSort.direction === "down"
                        ? "bordered"
                        : "faded"
                }
                aria-label="Impression Down"
            >
                <BiSolidDownArrowAlt /> Impression
            </Button>

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
