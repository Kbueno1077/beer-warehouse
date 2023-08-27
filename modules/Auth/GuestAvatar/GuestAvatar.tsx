'use client'

import {Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import AuthModal from "@/modules/Auth/AuthModal/AuthModal";
import React, {useRef} from "react";
import styles from './guest.module.css'
import {Link} from "@/i18n/navigation";
import {useTranslations} from "next-intl";

export default function GuestAvatar() {
    const t = useTranslations("navbar");
    const [isOpen, setIsOpen] = React.useState(false);


    return (
        <div className="flex items-center gap-4">
            <Dropdown
                closeOnSelect={false}
                placement="bottom-end"
            >
                <DropdownTrigger>
                    <Avatar
                        size={'md'}
                        isBordered
                        as="button"
                        className="transition-transform"
                        src={"https://i.pravatar.cc/150?u=a042581f4e29026704d"}
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    {/*<DropdownItem key="profile" className="h-14 gap-2">*/}
                    {/*    <p className="font-semibold">Signed in as</p>*/}
                    {/*    <p className="font-semibold">{session?.user?.email || session?.user?.name}</p>*/}
                    {/*</DropdownItem>*/}

                    <DropdownItem className={styles.dropBtn} key="login" textValue="Login">
                        <AuthModal mode="login"/>
                    </DropdownItem>

                    {/*<DropdownItem className={styles.dropBtn} key="login" textValue="Login">*/}
                    {/*    <AuthModal mode='register'/>*/}
                    {/*</DropdownItem>*/}

                    <DropdownItem closeOnSelect={true} className={styles.dropBtn} key="charts" textValue="Charts">
                        <Button className='p-0' fullWidth={true} color="primary" variant="ghost"
                                aria-label={t('chartsLink')}>
                            {/*//@ts-ignore*/}
                            <Link className="w-full" href="/charts">
                                {t('chartsLink')}
                            </Link>
                        </Button>


                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
