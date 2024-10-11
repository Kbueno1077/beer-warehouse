import {
    Accordion,
    AccordionItem,
    Avatar,
    Select,
    SelectItem,
} from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { UserType } from "@/util/types";

interface UsersControlProps {
    selectedUser: UserType | {};
}

export default function UsersControl({ selectedUser }: UsersControlProps) {
    return (
        <Accordion fullWidth={true} variant="splitted">
            <AccordionItem
                key="1"
                className="pb-3"
                aria-label="Chung Miller"
                startContent={
                    <Avatar
                        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                        className="w-20 h-20 text-large"
                    />
                }
                // subtitle="4 unread messages"
                // title={selectedUser.name}
            >
                <Input
                    className="mb-3"
                    fullWidth={true}
                    variant={"flat"}
                    label="Name"
                />
                <Input
                    className="mb-3"
                    fullWidth={true}
                    type="email"
                    variant={"flat"}
                    label="Email"
                />

                <Select label="Select an role" fullWidth={true}>
                    {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                            {role.label}
                        </SelectItem>
                    ))}
                </Select>
            </AccordionItem>
        </Accordion>
    );
}

export const roles = [
    { label: "Admin", value: "Admin" },
    { label: "User", value: "User" },
];
