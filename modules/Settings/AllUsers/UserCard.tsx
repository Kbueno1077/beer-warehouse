import React from "react";
import {
    Avatar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from "@nextui-org/react";
import { UserType } from "@/util/types";

interface UserCardProps {
    user: UserType;
    selectedId: string;
    handleSelectUser: Function;
}

export default function UserCard({
    user,
    selectedId,
    handleSelectUser,
}: UserCardProps) {
    return (
        <Card
            className={`min-w-[250px] ${selectedId === user.id && ""}`}
            isPressable
            onPress={() => handleSelectUser(user)}
            radius="md"
        >
            <CardHeader className="justify-between">
                <div className="flex gap-5">
                    <Avatar
                        isBordered
                        radius="full"
                        size="lg"
                        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                    />
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">
                            {user.name}
                        </h4>
                        {/*<h5 className="text-small tracking-tight text-default-600">@zoeylang</h5>*/}
                    </div>
                </div>
            </CardHeader>

            <CardBody className="">
                <b>Email: </b>
                <p className="text-default-500">{user.email}</p>
            </CardBody>

            <CardFooter className="text-small justify-end">
                <p className="text-default-500">{user.role}</p>
            </CardFooter>
        </Card>
    );
}
