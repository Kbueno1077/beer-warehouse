'use client'

import React from "react";
import UserCard from "@/modules/Settings/AllUsers/UserCard";
import {ScrollShadow} from "@nextui-org/react";
import UsersSearch from "@/modules/Settings/AllUsers/UsersSearch";
import {UserType} from "@/util/types";


interface UsersGridProps {
    users: Array<UserType>;
    selectedId: string;
    handleSelectUser: Function
}

export default function UsersGrid({users, selectedId, handleSelectUser}: UsersGridProps) {


    return (
        <ScrollShadow hideScrollBar={true} className='p-5 w-full flex justify-center gap-4 flex-wrap scroll-auto'>
            <UsersSearch/>

            {users.map((user) => {
                return (
                    <UserCard key={user.id} selectedId={selectedId} user={user} handleSelectUser={handleSelectUser}/>)
            })}


        </ScrollShadow>
    )
}
