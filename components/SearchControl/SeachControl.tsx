"use client";

import { useBearContext } from "@/store/useBeerContext";
import { CARD_MODE } from "@/util/types";
import { Avatar, Input } from "@nextui-org/react";
import React from "react";
import styles from "../../modules/UI/CardsUI/SearchControls/searchControls.module.css";
import { useTranslations } from "next-intl";

function SeachControl() {
    const t = useTranslations("table");

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

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            changeFilters({ ...filters, search: value });
        } else {
            changeFilters({ ...filters, search: "" });
        }
    }, []);

    if (mode !== CARD_MODE) return null;

    return (
        <Input
            className="w-full"
            startContent={
                <Avatar
                    size={"sm"}
                    isBordered
                    as="button"
                    className="transition-transform mr-3"
                    src={warehouseOwner?.image || "/noUser.png"}
                />
            }
            color={"default"}
            placeholder={t("search.placeholder")}
            label={""}
            size={"lg"}
            value={filters.search}
            onValueChange={onSearchChange}
            classNames={{
                label: styles.labelColor,
            }}
        />
    );
}

export default SeachControl;
