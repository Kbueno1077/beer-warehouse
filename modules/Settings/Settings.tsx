"use client";
import React from "react";

import UsersGrid from "@/modules/Settings/AllUsers/UsersGrid";
import UsersControl from "@/modules/Settings/AllUsers/UsersControl";
import { UserType } from "@/util/types";

export interface SettingsProps {
    serverFetchedUsers: Array<UserType>;
}

function Settings({ serverFetchedUsers }: SettingsProps) {
    const [users, setUsers] = React.useState(serverFetchedUsers);
    const [selectedUser, setSelectedUser] = React.useState({});
    const handleSearch = () => {};

    const handleSelectUser = (user: UserType) => {
        setSelectedUser(user);
    };

    return (
        <div className="flex gap-2">
            {/*<DesktopSidebar/>*/}

            {/*<div className='w-full h-screen flex flex-col justify-between'>*/}
            {/*  */}
            {/*    <UsersGrid selectedId={selectedUser.id} users={users} handleSelectUser={handleSelectUser}/>*/}

            {/*    <div className='w-full mb-[40px]'>*/}
            {/*        <UsersControl selectedUser={selectedUser}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}

export default Settings;
