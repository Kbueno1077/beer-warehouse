import React from "react";
import {useTranslations} from "next-intl";
import {CARD_MODE, DARK_MODE, LIGHT_MODE, TABLE_MODE} from "@/util/types";
import {TbCards} from "react-icons/tb";
import {VscTable} from "react-icons/vsc";
import {useBeerStore} from "@/store/zustand";
import {Badge, Button} from "@nextui-org/react";

import {track} from '@vercel/analytics';


export default function SwitchMode() {
    const {mode, setMode, resetFilters} = useBeerStore();
    const t = useTranslations('navbar');


    return (
        <>
            {mode === TABLE_MODE &&
                <Badge
                    isOneChar
                    content={<TbCards className='h-[12px] w-[12px]'/>}
                >
                    <Button onPress={() => {
                        resetFilters()
                        setMode(CARD_MODE)
                        track('View', {mode: "Cards"});
                    }} variant="faded" color='primary' size={"md"} isIconOnly aria-label={t('table-switch')}>
                        <VscTable className='h-[17px] w-[17px]'/>
                    </Button>
                </Badge>
            }

            {mode === CARD_MODE &&
                <Badge
                    isOneChar
                    content={<VscTable className='h-[12px] w-[12px]'/>}
                ><Button onPress={() => {
                    resetFilters()
                    setMode(TABLE_MODE)
                    track('View', {mode: "Table"});

                }} variant="faded" color='primary' size={"md"} isIconOnly aria-label={t('table-switch')}>
                    <TbCards className='h-[17px] w-[17px]'/>
                </Button>
                </Badge>
            }</>
    );
}

