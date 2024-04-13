import { BeerContext } from "@/app/providers";
import { useContext } from "react";
import { useStore } from "zustand";
import { BeerState } from "./zustand";

export function useBearContext<T>(selector: (state: BeerState) => T): T {
    const store = useContext(BeerContext);
    if (!store) throw new Error("Missing BearContext.Provider in the tree");
    return useStore(store, selector);
}
