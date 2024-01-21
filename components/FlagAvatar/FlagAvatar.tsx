'use client'

import React from "react";
import {Avatar} from "@nextui-org/react";
import {countryFlagsToTheLeft} from "@/util/javascript";
import styles from "./flag.module.css";
import countryCodes from "@/util/countries.json";
import {useTranslations} from "next-intl";

type FlagAvatarProps = {
    value: string,
    withName?: boolean
}

export default function FlagAvatar({value, withName}: FlagAvatarProps) {
    const tcountries = useTranslations('countries');

    // @ts-ignore
    const countryName = tcountries(countryCodes[value])

    let flag = value

    if (value === 'en') {
        flag = 'us'
    }


    return (
        <div className='flex gap-2'>
            <Avatar alt={''} className="w-6 h-6" src={`https://flagcdn.com/${flag}.svg`}
                    classNames={{img: countryFlagsToTheLeft.includes(flag) ? styles.countryImg : ""}}
            />

            {withName &&
                <span>{countryName}</span>
            }
        </div>
    );
}

