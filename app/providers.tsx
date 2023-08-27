'use client'

import {NextUIProvider} from '@nextui-org/react'
import {SessionProvider} from "next-auth/react";
import {SnackbarProvider} from 'notistack'
import Navigationbar from "@/components/Navigationbar/Navigationbar";
import React from "react";

export function Providers({children}: { children: React.ReactNode }) {
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

