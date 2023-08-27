'use client'

import React from "react";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/react";
import {TbSearch} from "react-icons/tb";


export default function UsersSearch() {

    return (
        <div className='w-full flex mt-2 mb-2 align-middle items-center gap-3'>

            <Input
                className=''
                fullWidth={true}
                color={'default'}
                label="Search a Beer"
                size={'lg'}

            />

            <div className='flex-grow-1'>
                <Button isIconOnly variant="faded"
                        aria-label="Search for Beers">
                    <TbSearch/>
                </Button>
            </div>

        </div>
    )
}
