//@ts-nocheck

import React from "react";
import {
    Avatar,
    Button,
    cn,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger
} from "@nextui-org/react";
import {locales, useRouter} from "@/i18n/navigation";
import FlagAvatar from "@/components/FlagAvatar/FlagAvatar";
import {useLocale, useTranslations} from "next-intl";
import {signOut, useSession} from "next-auth/react";
import AuthModal from "@/modules/Auth/AuthModal/AuthModal";
import styles from './settings.module.css'

import {IoIosLogOut} from "react-icons/io";
import {GiBeerBottle} from "react-icons/gi";
import {IoBarChartSharp} from "react-icons/io5";
import Spinner from "@/components/Loaders/Spinner";


export default function SettingsDropDown() {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    const router = useRouter();
    const locale = useLocale()
    const t = useTranslations('settingsDropdown');
    const [isOpen, setOpen] = React.useState(false)

    const {data: session, status} = useSession();
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([locale]));

    const handleSelection = async (e) => {
        console.log("GLOBAL", e.anchorKey)

        if (e.anchorKey === 'en' || e.anchorKey === 'es') {
            setSelectedKeys(e)
            handleClose()
            router.replace('/', {locale: e.values().next().value});
        }

        if (e.anchorKey === '/' || e.anchorKey === 'charts') {
            handleClose()
            router.push(`/${e.anchorKey}`);
        }

        if (e.anchorKey === 'logout') {
            handleClose()
            await signOut({redirect: false})
        }

    }

    const toggleOpen = () => {
        setOpen(!isOpen)
    }


    const handleClose = () => {
        setOpen(false)
    }


    return (
        <Dropdown
            backdrop="blur"
            isOpen={isOpen}
            shouldCloseOnBlur={false}
            onClose={() => {
                setOpen(false)
            }}
            closeOnSelect={false}
            classNames={{
                base: "before:bg-default-200", // change arrow background
                content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",

            }}
        >
            <DropdownTrigger onClick={toggleOpen}>
                <Avatar
                    size={'md'}
                    isBordered
                    as="button"
                    className="transition-transform"
                    src={session?.user?.image || "/noUser.png"}
                />
            </DropdownTrigger>

            <DropdownMenu
                selectionMode="single"
                selectedKeys={selectedKeys}
                classNames={{base: 'w-[250px]'}}
                onSelectionChange={handleSelection}
                variant="faded"
                aria-label={t('')}
            >


                {(!session?.user && status === 'unauthenticated') &&
                    <DropdownSection title={t('Session')}>
                        <DropdownItem
                            classNames={{
                                selectedIcon: styles.hiddenSvg
                            }}
                            key="login">
                            <AuthModal mode="login"/>
                        </DropdownItem>

                        {(!session?.user && status === 'loading') && <DropdownItem
                            classNames={{
                                selectedIcon: styles.hiddenSvg
                            }}
                            key="login">
                            <Button fullWidth={true} disabled={true} color="primary" variant="flat"
                                    aria-label={t('loading')}>
                                <Spinner/>
                            </Button>
                        </DropdownItem>}
                    </DropdownSection>
                }


                <DropdownSection title={t('navigation')}>
                    <DropdownItem
                        key="/"
                        // shortcut="⌘N"
                        description={t("dashboard-desc")}
                        startContent={<GiBeerBottle className={iconClasses}/>}
                    >
                        {t('dashboard')}
                    </DropdownItem>

                    <DropdownItem
                        key="charts"
                        // shortcut="⌘C"
                        description={t("charts-desc")}
                        startContent={<IoBarChartSharp className={iconClasses}/>}
                    >
                        {t('charts')}
                    </DropdownItem>
                </DropdownSection>

                <DropdownSection title={t("languages")}>
                    {locales.map(lang =>
                        <DropdownItem
                            key={lang}
                            description={t(lang)}
                            startContent={
                                <div className='flex gap-3  items-center'>
                                    <FlagAvatar value={lang}/>
                                </div>}
                        >
                            <p className='font-bold text-md'>{lang.toUpperCase()}</p>
                        </DropdownItem>)
                    }
                </DropdownSection>


                {(session?.user && status === 'authenticated') &&
                    <DropdownItem
                        key="logout"
                        className="text-danger"
                        color="danger"
                        // shortcut="⌘⇧D"
                        description={t('logout-desc')}
                        startContent={<IoIosLogOut className={cn(iconClasses, "text-danger")}/>}
                    >
                        {t('logout')}
                    </DropdownItem>}
            </DropdownMenu>
        </Dropdown>
    );
}

