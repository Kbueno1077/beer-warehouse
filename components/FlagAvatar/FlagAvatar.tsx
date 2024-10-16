import countryCodes from "@/util/countries.json";
import { countryFlagsToTheLeft } from "@/util/javascript";
import { Avatar } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import styles from "./flag.module.css";

type FlagAvatarProps = {
    value: string;
    withName?: boolean;
    nameClassName?: string;
};

export default function FlagAvatar({
    value,
    withName,
    nameClassName,
}: FlagAvatarProps) {
    const tcountries = useTranslations("countries");

    // @ts-ignore
    const countryName = tcountries(countryCodes[value]);

    let flag = value;

    if (value === "en") {
        flag = "us";
    }

    return (
        <div className="flex gap-2 items-center">
            <Avatar
                alt={`flag ${flag}`}
                className="w-6 h-6"
                src={`https://flagcdn.com/${flag}.svg`}
                classNames={{
                    img: countryFlagsToTheLeft.includes(flag)
                        ? styles.countryImg
                        : "",
                }}
            />

            {withName && (
                <span className={`${nameClassName}`}>{countryName}</span>
            )}
        </div>
    );
}
