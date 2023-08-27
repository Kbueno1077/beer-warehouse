"use client";

import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@nextui-org/react";
import {CiBeerMugFull} from "react-icons/ci";
import UserAvatar from "@/modules/Auth/UserAvatar/UserAvatar";
import AuthModal from "@/modules/Auth/AuthModal/AuthModal";
import {useSession} from "next-auth/react";
import {useTranslations} from "next-intl";
import SwitchLang from "@/components/SwitchLang/SwitchLang";
import SwitchMode from "@/components/SwitchMode/SwitchMode";
import styles from "./navigationBar.module.css";
import SwitchTheme from "@/components/SwitchTheme/SwitchTheme";
import {usePathname, Link} from "@/i18n/navigation";
import GuestAvatar from "@/modules/Auth/GuestAvatar/GuestAvatar";

export default function Navigationbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const {data: session, status} = useSession();
    const pathname = usePathname()
    const t = useTranslations("navbar");


    const playSound = () => {
        const audio = document?.getElementById("openCanSound")
        if (audio instanceof HTMLAudioElement) {
            audio.play()
        }
    };

    const handleOpen = (state: boolean) => {
        setIsMenuOpen(state)
    }

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
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />

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
                <SwitchTheme/>
                <SwitchLang/>
                {pathname === '/' &&
                    <SwitchMode/>
                }

                {!session?.user && status === "unauthenticated" && (
                    <NavbarItem className="hidden sm:flex">
                        <GuestAvatar/>
                    </NavbarItem>
                )}

                {session?.user && status === "authenticated" && (
                    <NavbarItem>
                        <UserAvatar/>
                    </NavbarItem>
                )}


            </NavbarContent>
            <NavbarMenu>
                <AuthModal mode="mobile-login"/>
                {/*<AuthModal mode="mobile-register"/>*/}

                <NavbarMenuItem>
                    <Link onClick={() => handleOpen(false)} className="w-full" href="/">
                        {t('dashboard')}
                    </Link>
                </NavbarMenuItem>

                {/*<NavbarMenuItem>*/}
                {/*    <Link onClick={() => handleOpen(false)} className="w-full" href="/friends">*/}
                {/*        {t('friendsLink')}*/}
                {/*    </Link>*/}
                {/*</NavbarMenuItem>*/}

                <NavbarMenuItem>
                    {  /*@ts-ignore*/}
                    <Link onClick={() => handleOpen(false)} className="w-full" href="/charts">
                        {t('chartsLink')}
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}
