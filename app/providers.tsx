"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider, getSession, useSession } from "next-auth/react";
import { SnackbarProvider } from "notistack";
import React from "react";
import { BeerStore, createBeerStore } from "@/store/zustand";
import { CARD_MODE, DARK_MODE, LIGHT_MODE, TABLE_MODE } from "@/util/types";
import { createContext } from "react";
import { useRef } from "react";
import { StoreProvider } from "@/store/StoreProvider";

export const BeerContext = createContext<BeerStore | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <StoreProvider>
                <SnackbarProvider
                    autoHideDuration={3000}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                >
                    <NextUIProvider>{children}</NextUIProvider>
                </SnackbarProvider>
            </StoreProvider>
        </SessionProvider>
    );
}
