// Provider wrapper
import { useRef } from "react";
import { BeerStore, createBeerStore } from "./zustand";
import { BeerContext } from "@/app/providers";
import { CARD_MODE, TABLE_MODE } from "@/util/types";
import { useSession } from "next-auth/react";

export function StoreProvider({ children, ...props }: any) {
    const { data: session } = useSession();
    const user = session?.user;

    const storeRef = useRef<BeerStore>();
    if (!storeRef.current) {
        storeRef.current = createBeerStore({
            mode: window.innerWidth < 1024 ? CARD_MODE : TABLE_MODE,
            //@ts-ignore
            warehouseOwner: user ?? { name: "Kevin" },
        });
    }

    return (
        <BeerContext.Provider value={storeRef.current}>
            {children}
        </BeerContext.Provider>
    );
}
