import React from "react";
import {Avatar} from "@nextui-org/react";
import {countryFlagsToTheLeft} from "@/util/javascript";
import styles from "./flag.module.css";

type FlagAvatarProps = {
    value: string
}

export default function FlagAvatar({value}: FlagAvatarProps) {

    let flag = value

    if (value === 'en') {
        flag = 'us'
    }

    return (
        <Avatar alt={''} className="w-6 h-6" src={`https://flagcdn.com/${flag}.svg`}
                classNames={{img: countryFlagsToTheLeft.includes(flag) ? styles.countryImg : ""}}
        />
    );
}

