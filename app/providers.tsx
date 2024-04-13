"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";
import React, { useEffect, useLayoutEffect } from "react";
import { BeerStore, createBeerStore } from "@/store/zustand";
import { CARD_MODE, DARK_MODE, LIGHT_MODE, TABLE_MODE } from "@/util/types";
import { createContext } from "react";
import { useRef } from "react";
import { ThemeProvider } from "next-themes";

export const BeerContext = createContext<BeerStore | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
    const store = useRef(
        createBeerStore({
            mode: window.innerWidth < 1024 ? CARD_MODE : TABLE_MODE,
        })
    ).current;

    return (
        <SessionProvider>
            <BeerContext.Provider value={store}>
                <SnackbarProvider
                    autoHideDuration={3000}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                >
                    <NextUIProvider>{children}</NextUIProvider>
                </SnackbarProvider>
            </BeerContext.Provider>
        </SessionProvider>
    );
}
