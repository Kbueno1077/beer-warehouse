"use client";

import { useBearContext } from "@/store/useBeerContext";
import { BeerType } from "@/util/types";
import { useSession } from "next-auth/react";
import DeleteBeer from "../UI/BeerCrud/DeleteBeer";
import UpdateBeer from "../UI/BeerCrud/UpdateBeer";

interface BeerDetailsProps {
    beer: BeerType;
}

function BeerActions({ beer }: BeerDetailsProps) {
    const { warehouseOwner } = useBearContext((s) => {
        return {
            warehouseOwner: s.warehouseOwner,
        };
    });

    const { data: session } = useSession();
    const user = session?.user;

    const isOwner = user?.name === warehouseOwner?.name;

    if (isOwner) {
        return (
            <div className="flex gap-2 mt-2">
                <UpdateBeer selectedBeer={beer} isOwner={isOwner} />
                <DeleteBeer selectedBeer={beer} isOwner={isOwner} />
            </div>
        );
    }
    return null;
}

export default BeerActions;
