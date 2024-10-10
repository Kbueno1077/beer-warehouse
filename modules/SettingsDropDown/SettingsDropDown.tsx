//@ts-nocheck

import FlagAvatar from "@/components/FlagAvatar/FlagAvatar";
import { locales, useRouter } from "@/i18n/navigation";
import AuthModal from "@/modules/Auth/AuthModal/AuthModal";
import {
    Avatar,
    Button,
    ButtonGroup,
    cn,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import styles from "./settings.module.css";

import { GiBeerBottle } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";
import { IoBarChartSharp } from "react-icons/io5";
import { MdOutlineCollectionsBookmark } from "react-icons/md";

import Spinner from "@/components/Loaders/Spinner";
import { MoonIcon, SunIcon } from "@/components/SwitchTheme/SwitchTheme";
import { usePathname } from "@/i18n/navigation";
import { useBearContext } from "@/store/useBeerContext";
import { CARD_MODE, DARK_MODE, LIGHT_MODE, TABLE_MODE } from "@/util/types";
import { track } from "@vercel/analytics";
import { useTheme } from "next-themes";
import { TbCards } from "react-icons/tb";
import { VscTable } from "react-icons/vsc";
import FiltersModal from "../UI/Filters/FiltersModal";

export default function SettingsDropDown() {
    const iconClasses =
        "text-xl text-default-500 pointer-events-none flex-shrink-0";
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations("settingsDropdown");
    const [isOpen, setOpen] = React.useState(false);
    const pathname = usePathname();

    const { data: session, status } = useSession();

    const { handleWarehouseChange, mode, setMode, resetFilters } =
        useBearContext((s) => {
            return {
                handleWarehouseChange: s.handleWarehouseChange,
                mode: s.mode,
                setMode: s.setMode,
                resetFilters: s.resetFilters,
            };
        });
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([locale]));

    const { theme, setTheme } = useTheme();

    const handleThemeChange = (value: boolean) => {
        setTheme(value ? LIGHT_MODE : DARK_MODE);
        track("Theme", { mode: value ? LIGHT_MODE : DARK_MODE });
    };

    const handleSelection = async (e) => {
        if (e.anchorKey === "en" || e.anchorKey === "es") {
            setSelectedKeys(e);
            handleClose();
            router.replace("/", { locale: e.values().next().value });
        }

        if (
            e.anchorKey === "/" ||
            e.anchorKey === "charts" ||
            e.anchorKey === "collections"
        ) {
            handleClose();
            router.push(`/${e.anchorKey}`);
        }

        if (e.anchorKey === "logout") {
            handleClose();
            await signOut({ redirect: false });
            handleWarehouseChange("Kevin");
        }
    };

    const toggleOpen = () => {
        setOpen(!isOpen);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dropdown
            backdrop="blur"
            isOpen={isOpen}
            shouldCloseOnBlur={false}
            onClose={() => {
                setOpen(false);
            }}
            closeOnSelect={false}
            classNames={{
                base: "before:bg-default-200", // change arrow background
                content:
                    "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
            }}
        >
            <DropdownTrigger onClick={toggleOpen}>
                <Avatar
                    size={"md"}
                    isBordered
                    as="button"
                    onClick={toggleOpen}
                    className="transition-transform"
                    src={session?.user?.image || "/noUser.png"}
                />
            </DropdownTrigger>

            <DropdownMenu
                selectionMode="single"
                selectedKeys={selectedKeys}
                classNames={{ base: "w-[250px]" }}
                onSelectionChange={handleSelection}
                variant="faded"
                aria-label={"Settings"}
            >
                {!session?.user && status === "unauthenticated" && (
                    <DropdownSection title={t("Session")}>
                        <DropdownItem
                            classNames={{
                                selectedIcon: styles.hiddenSvg,
                            }}
                            key="login"
                        >
                            <AuthModal mode="login" />
                        </DropdownItem>

                        {!session?.user && status === "loading" && (
                            <DropdownItem
                                classNames={{
                                    selectedIcon: styles.hiddenSvg,
                                }}
                                key="login"
                            >
                                <Button
                                    fullWidth={true}
                                    disabled={true}
                                    color="primary"
                                    variant="flat"
                                    aria-label={t("loading")}
                                >
                                    <Spinner />
                                </Button>
                            </DropdownItem>
                        )}
                    </DropdownSection>
                )}

                <DropdownSection title={t("navigation")}>
                    <DropdownItem
                        key="/"
                        // shortcut="⌘N"
                        description={t("dashboard-desc")}
                        startContent={
                            <MdOutlineCollectionsBookmark
                                className={iconClasses}
                            />
                        }
                    >
                        {t("dashboard")}
                    </DropdownItem>

                    <DropdownItem
                        key="collections"
                        // shortcut="⌘N"
                        description={t("collections-desc")}
                        startContent={<GiBeerBottle className={iconClasses} />}
                    >
                        {t("collections")}
                    </DropdownItem>

                    <DropdownItem
                        key="charts"
                        // shortcut="⌘C"
                        description={t("charts-desc")}
                        startContent={
                            <IoBarChartSharp className={iconClasses} />
                        }
                    >
                        {t("charts")}
                    </DropdownItem>
                </DropdownSection>

                <DropdownSection title={t("ui-settings")}>
                    <DropdownItem>
                        {pathname === "/" && (
                            <ButtonGroup className="mr-2">
                                <Button
                                    onPress={() => {
                                        resetFilters();
                                        setMode(CARD_MODE);
                                        track("View", { mode: "Cards" });
                                    }}
                                    variant="faded"
                                    color={"primary"}
                                    className={`${
                                        mode === TABLE_MODE
                                            ? "primary"
                                            : "bg-default-300"
                                    }`}
                                    size={"md"}
                                    isIconOnly
                                    aria-label={t("table-switch")}
                                >
                                    <TbCards className="h-[17px] w-[17px]" />
                                </Button>
                                <Button
                                    onPress={() => {
                                        resetFilters();
                                        setMode(TABLE_MODE);
                                        track("View", { mode: "Table" });
                                    }}
                                    variant="faded"
                                    color={"primary"}
                                    className={`${
                                        mode === CARD_MODE
                                            ? "primary"
                                            : "bg-default-300"
                                    }`}
                                    size={"md"}
                                    isIconOnly
                                    aria-label={t("table-switch")}
                                >
                                    <VscTable className="h-[17px] w-[17px]" />
                                </Button>
                            </ButtonGroup>
                        )}

                        <ButtonGroup>
                            <Button
                                onPress={() => {
                                    handleThemeChange(true);
                                }}
                                variant="faded"
                                color={"primary"}
                                size={"md"}
                                isIconOnly
                                aria-label={t("table-switch")}
                                className={`${
                                    theme === DARK_MODE
                                        ? "primary"
                                        : "bg-default-300"
                                }`}
                            >
                                <SunIcon className="h-[17px] w-[17px]" />
                            </Button>
                            <Button
                                onPress={() => {
                                    handleThemeChange(false);
                                }}
                                variant="faded"
                                color={"primary"}
                                size={"md"}
                                isIconOnly
                                aria-label={t("table-switch")}
                                className={`${
                                    theme === LIGHT_MODE
                                        ? "primary"
                                        : "bg-default-300"
                                }`}
                            >
                                <MoonIcon className="h-[17px] w-[17px]" />
                            </Button>
                        </ButtonGroup>
                    </DropdownItem>
                </DropdownSection>

                <DropdownSection title={t("languages")}>
                    {locales.map((lang) => (
                        <DropdownItem
                            key={lang}
                            description={t(lang)}
                            startContent={
                                <div className="flex gap-3  items-center">
                                    <FlagAvatar value={lang} />
                                </div>
                            }
                        >
                            <p className="font-bold text-md">
                                {lang.toUpperCase()}
                            </p>
                        </DropdownItem>
                    ))}
                </DropdownSection>

                {session?.user && status === "authenticated" && (
                    <DropdownSection title={t("Session")}>
                        <DropdownItem
                            key="logout"
                            className="text-danger"
                            color="danger"
                            // shortcut="⌘⇧D"
                            description={t("logout-desc")}
                            startContent={
                                <IoIosLogOut
                                    className={cn(iconClasses, "text-danger")}
                                />
                            }
                        >
                            {t("logout")}
                        </DropdownItem>
                    </DropdownSection>
                )}
            </DropdownMenu>
        </Dropdown>
    );
}
