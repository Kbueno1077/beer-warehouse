"use client";

import { StoreProvider } from "@/store/StoreProvider";
import { BeerStore } from "@/store/zustand";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";
import React, { createContext } from "react";

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
