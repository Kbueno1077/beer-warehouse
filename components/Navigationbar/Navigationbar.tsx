"use client";

import { Link } from "@/i18n/navigation";
import AuthModal from "@/modules/Auth/AuthModal/AuthModal";
import SettingsDropDown from "@/modules/SettingsDropDown/SettingsDropDown";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarMenu,
    NavbarMenuItem,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";
import { CiBeerMugFull } from "react-icons/ci";
import styles from "./navigationBar.module.css";

export default function Navigationbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const t = useTranslations("navbar");

    const playSound = () => {
        const audio = document?.getElementById("openCanSound");
        if (audio instanceof HTMLAudioElement) {
            audio.play();
        }
    };

    const handleOpen = (state: boolean) => {
        setIsMenuOpen(state);
    };

    return (
        <Navbar
            shouldHideOnScroll
            onMenuOpenChange={setIsMenuOpen}
            classNames={{
                item: [
                    "flex",
                    "relative",
                    "h-full",
                    "items-center",
                    "data-[active=true]:after:content-['']",
                    "data-[active=true]:after:absolute",
                    "data-[active=true]:after:bottom-0",
                    "data-[active=true]:after:left-0",
                    "data-[active=true]:after:right-0",
                    "data-[active=true]:after:h-[2px]",
                    "data-[active=true]:after:rounded-[2px]",
                    "data-[active=true]:after:bg-primary",
                ],
            }}
        >
            <audio id="openCanSound">
                <source src="/openCanSound.mp3" type="audio/mp3"></source>
            </audio>

            <NavbarContent>
                <NavbarBrand>
                    <CiBeerMugFull
                        onClick={playSound}
                        className={"cursor-pointer w-7 h-7"}
                    />
                    <Link className={styles.title} href="/">
                        {t("beer-warehouse")}
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="end">
                <div className="ml-[5px]">
                    <SettingsDropDown />
                </div>
            </NavbarContent>

            <NavbarMenu>
                <AuthModal mode="mobile-login" />

                <NavbarMenuItem>
                    <Link
                        onClick={() => handleOpen(false)}
                        className="w-full"
                        href="/"
                    >
                        {t("dashboard")}
                    </Link>
                </NavbarMenuItem>

                <NavbarMenuItem>
                    <Link
                        onClick={() => handleOpen(false)}
                        className="w-full"
                        /*@ts-ignore*/
                        href="/charts"
                    >
                        {t("chartsLink")}
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}
