'use client'


import React from "react";
import {Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {signOut, useSession} from "next-auth/react";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";

export default function UserAvatar() {
    const {data: session} = useSession();
    const t = useTranslations("navbar");

    const handleSignOut = async () => {
        await signOut({redirect: false})
    }

    return (
        <div className="flex items-center gap-4">
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Avatar
                        size={'md'}
                        isBordered
                        as="button"
                        className="transition-transform"
                        src={session?.user?.image || "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">{session?.user?.email || session?.user?.name}</p>
                    </DropdownItem>

                    <DropdownItem className={'text-center'} key="charts" textValue="Charts">
                        {/*//@ts-ignore*/}
                        <Link className="w-full" href="/charts">
                            {t('chartsLink')}
                        </Link>
                    </DropdownItem>

                    <DropdownItem onClick={handleSignOut} key="logout" color="danger" textValue="Log Out">
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

