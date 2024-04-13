"use client";

import { Input } from "@nextui-org/input";
import { Accordion, AccordionItem, Selection } from "@nextui-org/react";
import FiltersModal from "@/modules/UI/Filters/FiltersModal";
import { MdKeyboardArrowUp } from "react-icons/md";
import styles from "./searchControls.module.css";

import React, { useState } from "react";
import SortModal from "@/modules/UI/CardsUI/Sort/SortModal";
import GroupByModal from "@/modules/UI/CardsUI/GroupBy/GroupByModal";
import { useTranslations } from "next-intl";
import { DARK_MODE } from "@/util/types";
import { useBearContext } from "@/store/useBeerContext";
import { useTheme } from "next-themes";

const MobileSearchControls = () => {
    const [selectedKeys, setSelectedKeys] = useState<Iterable<any>>(
        new Set([])
    );

    const { theme, resolvedTheme } = useTheme();
    const { filters, changeFilters } = useBearContext((s) => {
        return {
            filters: s.filters,
            changeFilters: s.changeFilters,
        };
    });
    const t = useTranslations("table");

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            changeFilters({ ...filters, search: value });
        } else {
            changeFilters({ ...filters, search: "" });
        }
    }, []);

    return (
        <Accordion
            className={styles.controlsWrapper}
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            itemClasses={{
                base:
                    resolvedTheme === DARK_MODE
                        ? styles.controlsWrapper__dark
                        : styles.controlsWrapper__light,
                trigger: styles.accordionWrapper,
            }}
        >
            <AccordionItem
                indicator={({ isOpen }) => (isOpen ? <div></div> : <div></div>)}
                key="1"
                aria-label="Search and Filters Accordion"
                classNames={{ trigger: styles.wrapper }}
                startContent={
                    <div
                        style={{
                            transform: (selectedKeys as Set<any>).size
                                ? "rotate(180deg)"
                                : "",
                        }}
                        className={styles.startContent}
                    >
                        <MdKeyboardArrowUp className={styles.arrowOpenSearch} />
                    </div>
                }
            >
                <div className="pr-1 pl-1">
                    <div className="w-full flex justify-end gap-2 mb-2 mr-2">
                        <GroupByModal />
                        <FiltersModal />
                        <SortModal />
                    </div>

                    <div className={styles.inputWrapper}>
                        <Input
                            color={"default"}
                            label={t("search.placeholder")}
                            size={"sm"}
                            value={filters.search}
                            onValueChange={onSearchChange}
                            classNames={{
                                label: styles.labelColor,
                            }}
                        />
                    </div>
                </div>
            </AccordionItem>
        </Accordion>
    );
};

export default MobileSearchControls;
