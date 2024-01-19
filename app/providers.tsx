'use client'

import {NextUIProvider} from '@nextui-org/react'
import {SessionProvider} from "next-auth/react";
import {SnackbarProvider} from 'notistack'
import React, {useEffect} from "react";
import {useBeerStore} from "@/store/zustand";
import {DARK_MODE, LIGHT_MODE} from "@/util/types";

export function Providers({children}: { children: React.ReactNode }) {
    const {theme, setTheme} = useBeerStore();

    useEffect(() => {
        setTheme(window.matchMedia("(prefers-color-scheme: dark)") ? DARK_MODE : LIGHT_MODE)
    }, [])

    return (
        <SessionProvider>
            <SnackbarProvider autoHideDuration={3000} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <NextUIProvider>

                    {children}
                </NextUIProvider>
            </SnackbarProvider>
        </SessionProvider>
    )
}

