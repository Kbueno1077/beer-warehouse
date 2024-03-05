import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }: any) => ({
    messages: (await import(`./dictionaries/${locale}.json`)).default,
}));
