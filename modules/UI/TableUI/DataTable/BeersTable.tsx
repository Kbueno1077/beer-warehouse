"use client";

import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Pagination,
    Selection,
    SortDescriptor,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    User,
} from "@nextui-org/react";
import React from "react";

import { TbScanEye } from "react-icons/tb";
import countryCodes from "../../../../util/countries.json";

import { PiImagesSquare } from "react-icons/pi";
import { ChevronDownIcon, SearchIcon } from "./TableIcons";

import {
    alcoholColorMap,
    alcoholOptions,
    columns,
    INITIAL_VISIBLE_COLUMNS,
    mapOperands,
    mapPercentToString,
} from "./data";

import { CustomChip } from "@/components/CustomChip/CustomChip";
import FlagAvatar from "@/components/FlagAvatar/FlagAvatar";
import AddBeer from "@/modules/UI/BeerCrud/AddBeer";
import DeleteBeer from "@/modules/UI/BeerCrud/DeleteBeer";
import UpdateBeer from "@/modules/UI/BeerCrud/UpdateBeer";
import FiltersModal from "@/modules/UI/Filters/FiltersModal";
import { useBearContext } from "@/store/useBeerContext";
import { capitalize } from "@/util/javascript";
import { BeerType } from "@/util/types";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import {
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowRight,
    MdOutlineKeyboardArrowUp,
    MdOutlineKeyboardDoubleArrowDown,
    MdOutlineKeyboardDoubleArrowUp,
} from "react-icons/md";

export default function BeersTable() {
    const { data: session } = useSession();
    const user = session?.user;
    const t = useTranslations("table");
    const timpression = useTranslations("impression");
    const tcountries = useTranslations("countries");

    const { allBeers, filters, changeFilters, warehouseOwner } = useBearContext(
        (s) => {
            return {
                allBeers: s.allBeers,
                changeFilters: s.changeFilters,
                warehouseOwner: s.warehouseOwner,
                filters: s.filters,
            };
        }
    );

    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
        new Set([])
    );
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
        new Set(INITIAL_VISIBLE_COLUMNS)
    );
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "age",
        direction: "ascending",
    });

    const [page, setPage] = React.useState(1);
    const hasSearchFilter = Boolean(filters.search);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid)
        );
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredBeers = [...allBeers];

        if (hasSearchFilter) {
            filteredBeers = filteredBeers.filter((beer) => {
                return !!(
                    beer &&
                    beer.name &&
                    beer.name
                        .toLowerCase()
                        .includes(filters.search.toLowerCase())
                );
            });
        }

        if (filters?.alcoholFilters?.length !== alcoholOptions.length) {
            filteredBeers = filteredBeers.filter((beer) => {
                return filters.alcoholFilters.includes(
                    mapPercentToString(beer.alcohol_percentage)
                );
            });
        }

        if (filters?.mlFilters?.mlValue !== -1) {
            filteredBeers = filteredBeers.filter((beer) => {
                return mapOperands(
                    filters.mlFilters.operand,
                    filters.mlFilters.mlValue,
                    beer.ml
                );
            });
        }

        if (filters.countryFilters.length) {
            filteredBeers = filteredBeers.filter((beer) =>
                filters.countryFilters
                    .map((countryCode) => countryCode.value)
                    .includes(beer.country)
            );
        }

        setPage(1);
        return filteredBeers;
    }, [
        allBeers,
        filters.countryFilters.length,
        filters.search,
        filters.mlFilters.operand,
        filters.mlFilters.mlValue,
        filters.alcoholFilters,
    ]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const pageItems = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return [...filteredItems]
            .sort((a: BeerType, b: BeerType) => {
                const first = a[
                    sortDescriptor.column as keyof BeerType
                ] as number;
                const second = b[
                    sortDescriptor.column as keyof BeerType
                ] as number;
                const cmp = first < second ? -1 : first > second ? 1 : 0;

                return sortDescriptor.direction === "descending" ? -cmp : cmp;
            })
            .slice(start, end);
    }, [sortDescriptor, page, rowsPerPage, filteredItems]);

    const renderCell = React.useCallback(
        (beer: BeerType, columnKey: React.Key) => {
            const cellValue = beer[columnKey as keyof BeerType];

            switch (columnKey) {
                case "name":
                    const imageSplit = beer.evidence_img
                        ? beer.evidence_img.split("upload")
                        : ["", ""];
                    const thumbnail =
                        imageSplit[0] +
                        "upload/c_thumb,w_200,g_face" +
                        imageSplit[1];

                    return (
                        <User
                            avatarProps={{
                                radius: "full",
                                size: "sm",
                                src: thumbnail || "",
                            }}
                            classNames={{
                                description: "text-default-500",
                            }}
                            description={beer.name}
                            name={cellValue}
                        >
                            {beer.name}
                        </User>
                    );

                case "ml":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-small capitalize">
                                {cellValue}
                            </p>
                            {/*<p className="text-bold text-tiny capitalize text-default-500">{beer.ml}</p>*/}
                        </div>
                    );

                case "initial_impression":
                    console.log(cellValue);
                    return (
                        <div className="flex gap-2 items-center">
                            {cellValue === "Excellent" && (
                                <div className="">
                                    <MdOutlineKeyboardArrowUp
                                        style={{
                                            color: "green",
                                            fontSize: 18,
                                            translate: "0 5.5px",
                                        }}
                                    />
                                    <MdOutlineKeyboardDoubleArrowUp
                                        style={{
                                            color: "green",
                                            fontSize: 18,
                                            translate: "0 -5.5px",
                                        }}
                                    />
                                </div>
                            )}
                            {cellValue === "Amazing" && (
                                <MdOutlineKeyboardDoubleArrowUp
                                    style={{ color: "green", fontSize: 18 }}
                                />
                            )}
                            {cellValue === "Good" && (
                                <MdOutlineKeyboardArrowUp
                                    style={{ color: "green", fontSize: 18 }}
                                />
                            )}
                            {cellValue === "Average" && (
                                <MdOutlineKeyboardArrowRight
                                    style={{ color: "gray", fontSize: 18 }}
                                />
                            )}
                            {cellValue === "Bad" && (
                                <MdOutlineKeyboardArrowDown
                                    style={{ color: "red", fontSize: 18 }}
                                />
                            )}
                            {cellValue === "Awful" && (
                                <MdOutlineKeyboardDoubleArrowDown
                                    style={{ color: "red", fontSize: 18 }}
                                />
                            )}
                            {cellValue === "Horrible" && (
                                <div>
                                    <MdOutlineKeyboardArrowDown
                                        style={{
                                            color: "red",
                                            fontSize: 18,
                                            translate: "0 5.5px",
                                        }}
                                    />
                                    <MdOutlineKeyboardDoubleArrowDown
                                        style={{
                                            color: "red",
                                            fontSize: 18,
                                            translate: "0 -5px",
                                        }}
                                    />
                                </div>
                            )}

                            <p className="text-bold text-small capitalize">
                                {timpression(cellValue)}
                            </p>
                        </div>
                    );

                case "country":
                    return (
                        <div className="flex items-center align-middle gap-2">
                            {cellValue !== "TBD" && cellValue !== "" && (
                                <FlagAvatar
                                    value={
                                        typeof cellValue !== "string"
                                            ? ""
                                            : cellValue
                                    }
                                />
                            )}

                            {cellValue !== "TBD" && cellValue !== "" && (
                                //@ts-ignore
                                <p className="text-bold text-small capitalize">
                                    {cellValue
                                        ? //@ts-ignore
                                          tcountries(countryCodes[cellValue])
                                            ? tcountries(
                                                  //@ts-ignore
                                                  countryCodes[cellValue]
                                              )
                                            : //@ts-ignore
                                              countryCodes[cellValue]
                                        : ""}
                                </p>
                            )}
                        </div>
                    );

                case "bought_in":
                    return (
                        <div className="flex items-center align-middle gap-2">
                            {cellValue !== "TBD" && cellValue !== "" && (
                                <FlagAvatar
                                    value={
                                        typeof cellValue !== "string"
                                            ? ""
                                            : cellValue
                                    }
                                />
                            )}

                            {cellValue !== "TBD" && cellValue !== "" && (
                                <p className="text-bold text-small capitalize">
                                    {cellValue
                                        ? //@ts-ignore
                                          tcountries(countryCodes[cellValue])
                                            ? tcountries(
                                                  //@ts-ignore
                                                  countryCodes[cellValue]
                                              ) //@ts-ignore
                                            : countryCodes[cellValue]
                                        : ""}
                                </p>
                            )}
                        </div>
                    );

                case "alcohol_percentage":
                    const mapColor = mapPercentToString(
                        beer.alcohol_percentage
                    );

                    return (
                        <CustomChip
                            className="capitalize border-none gap-1 text-white"
                            color={alcoholColorMap[mapColor || "default"]}
                            radius="md"
                            size="md"
                            classNames={{
                                content: "w-[40px] text-center",
                            }}
                        >
                            {beer.alcohol_percentage >= 0 ? cellValue : "N/A"}
                        </CustomChip>
                    );

                case "evidence_img":
                    const url = beer.evidence_img;
                    return (
                        <>
                            {url && (
                                <Button
                                    color="primary"
                                    onClick={() => window.open(url, "_blank")}
                                    size="sm"
                                    variant="bordered"
                                    startContent={<PiImagesSquare />}
                                >
                                    {t("evidence")}
                                </Button>
                            )}
                        </>
                    );
                case "actions":
                    const currentBeer = allBeers.find(
                        (item) => item.id === beer.id
                    );

                    return (
                        <div className="relative flex justify-end items-center gap-2">
                            <Button
                                disabled={true}
                                variant="faded"
                                size={"sm"}
                                isIconOnly
                                color="danger"
                                aria-label="Go To Beer Page"
                            >
                                <TbScanEye className="h-[17px] w-[17px] text-gray-500" />
                            </Button>

                            <UpdateBeer
                                selectedBeer={beer}
                                isOwner={user?.name === warehouseOwner}
                            />
                            <DeleteBeer
                                selectedBeer={beer}
                                isOwner={user?.name === warehouseOwner}
                            />
                        </div>
                    );
                default:
                    return cellValue;
            }
        },
        [user]
    );

    const onRowsPerPageChange = React.useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setRowsPerPage(Number(e.target.value));
            setPage(1);
        },
        []
    );

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            changeFilters({ ...filters, search: value });
            setPage(1);
        } else {
            changeFilters({ ...filters, search: "" });
        }
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex flex-col justify-between gap-3 sm:flex-row">
                    <Input
                        isClearable
                        classNames={{
                            base: "w-full sm:max-w-[44%] ",
                            inputWrapper: "border-1 h-[40px]",
                        }}
                        placeholder={t("search.placeholder")}
                        startContent={
                            <SearchIcon className="text-default-300" />
                        }
                        value={filters.search}
                        variant="bordered"
                        onClear={() =>
                            changeFilters({ ...filters, search: "" })
                        }
                        onValueChange={onSearchChange}
                    />

                    <div className="flex gap-3 justify-end">
                        <FiltersModal />

                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    endContent={
                                        <ChevronDownIcon className="text-small" />
                                    }
                                    size="sm"
                                    variant="flat"
                                >
                                    {t("columnsBtn")}
                                </Button>
                            </DropdownTrigger>

                            <DropdownMenu
                                disallowEmptySelection
                                aria-label={t("columnsBtn")}
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem
                                        key={column.uid}
                                        className="capitalize"
                                    >
                                        {capitalize(
                                            t(column.name.toLowerCase())
                                        )}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>

                        {user && user.name === warehouseOwner && <AddBeer />}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-600 text-small">
                        {t("total", { count: filteredItems.length })}
                    </span>
                    <label className="flex items-center text-default-600 text-small">
                        {t("pageRows")}
                        <select
                            className="bg-transparent outline-none text-default-600 text-small"
                            defaultValue={rowsPerPage}
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filters.search,
        filters.alcoholFilters,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        allBeers.length,
        hasSearchFilter,
        user,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    showControls
                    classNames={{
                        cursor: "bg-foreground text-background",
                    }}
                    color="default"
                    isDisabled={hasSearchFilter}
                    page={page}
                    total={pages}
                    variant="light"
                    onChange={setPage}
                />
                <span className="text-small text-default-600">
                    {/*{selectedKeys === "all"*/}
                    {/*    ? "All items selected"*/}
                    {/*    : `${selectedKeys.size} of ${pageItems.length} selected`}*/}
                </span>
            </div>
        );
    }, [selectedKeys, pageItems.length, page, pages, hasSearchFilter]);

    const classNames = React.useMemo(
        () => ({
            wrapper: ["max-h-[382px]", "max-w-3xl"],
            // th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
            // tr: ["bg-[#E0E4E6]"],
            // td: [
            //     // changing the rows border radius
            //     // first
            //     "group-data-[first=true]:first:before:rounded-none",
            //     "group-data-[first=true]:last:before:rounded-none",
            //     // middle
            //     "group-data-[middle=true]:before:rounded-none",
            //     // last
            //     "group-data-[last=true]:first:before:rounded-none",
            //     "group-data-[last=true]:last:before:rounded-none",
            // ],
        }),
        []
    );

    return (
        <Table
            isCompact
            removeWrapper
            isStriped
            aria-label="Example table with custom cells, pagination and sorting"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            checkboxesProps={{
                classNames: {
                    // wrapper: "after:bg-foreground after:text-background text-background",
                },
            }}
            classNames={classNames}
            selectedKeys={selectedKeys}
            // selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "end" : "start"}
                        allowsSorting={column.sortable}
                    >
                        <div
                            className={`flex ${
                                column.uid === "actions" && "justify-end"
                            }`}
                        >
                            {t(column.name.toLowerCase()).toUpperCase()}
                        </div>
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                emptyContent={
                    hasSearchFilter ||
                    filters.alcoholFilters ||
                    filters.countryFilters ||
                    filters.mlFilters
                        ? "No beers match applied filters"
                        : "No beers found"
                }
                items={sortedItems}
            >
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
