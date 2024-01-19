'use client'

import React from "react";
import {locales, useRouter} from '@/i18n/navigation';
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {useTranslations, useLocale} from "next-intl";
import FlagAvatar from "@/components/FlagAvatar/FlagAvatar";
import {IoLanguage} from "react-icons/io5";


export default function SwitchLang() {
    const router = useRouter();
    const locale = useLocale()
    const t = useTranslations('lang');

    const [selectedKeys, setSelectedKeys] = React.useState(new Set([locale]));


    const switchLanguage = (lang: any) => {
        router.replace('/', {locale: lang.values().next().value});
    }

    return (
        <Dropdown classNames={{base: 'min-w-[0px]'}}>
            <DropdownTrigger>
                <Button
                    variant="faded" color='primary' size={"md"} isIconOnly={true}
                    aria-label={t('switch-lang-btn')}
                >
                    <IoLanguage className='h-[18px] w-[18px]'/>
                </Button>
            </DropdownTrigger>

            <DropdownMenu
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={switchLanguage}
                variant="faded"
                aria-label={t('switch-lang-dropdown')}>

                {locales.map(lang =>
                    <DropdownItem
                        key={lang}

                        startContent={
                            <div className='flex gap-3  items-center'>
                                <FlagAvatar value={lang}/>
                                <p className='font-bold text-md'>{lang.toUpperCase()}</p>
                            </div>}
                    >
                    </DropdownItem>)
                }
            </DropdownMenu>
        </Dropdown>
    );
}

