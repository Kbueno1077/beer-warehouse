import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { Providers } from "@/app/providers";
import { Inter } from "next/font/google";

import "../globals.css";
import Navigationbar from "@/components/Navigationbar/Navigationbar";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

// Can be imported from a shared config
const locales = ["en", "es"];

export const metadata: Metadata = {
    icons: { icon: "../favicon.ico" },
    title: { default: "Beer Warehouse", template: "%s - Beer Warehouse" },
    twitter: { card: "summary_large_image" },
    description:
        "Discover the world of beer with our interactive platform. Save, rate, and review every beer you’ve tasted and explore collections from other beer enthusiasts. Whether you’re a casual drinker or a connoisseur, our site is your passport to the diverse universe of beer. Join us and start your beer journey today. Cheers!",
};

export default async function RootLayout({
    children,
    params: { lang },
}: {
    children: React.ReactNode;
    params: { lang: string };
}) {
    if (!locales.includes(lang as any)) notFound();

    let messages;
    try {
        messages = (await import(`../../i18n/dictionaries/${lang}.json`))
            .default;
    } catch (error) {
        notFound();
    }

    return (
        <html className={"light"} lang={lang}>
            <body>
                <Providers>
                    <NextIntlClientProvider messages={messages}>
                        <Navigationbar />

                        {children}
                        <Analytics />
                    </NextIntlClientProvider>
                </Providers>
            </body>
        </html>
    );
}
