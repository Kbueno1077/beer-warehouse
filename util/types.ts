import { Beers } from "@/xata/xata";

export type BeerType = Beers;

export type BeerTypeExtended = BeerType & { order: number };

export const ADMIN_ROLE = "Admin";
export const USER_ROLE = "User";
export const OWNER_ROLE = "Owner";

export const TABLE_MODE = "table";
export const CARD_MODE = "cards";

export const LIGHT_MODE = "light";
export const DARK_MODE = "dark";

export type ModeType = typeof TABLE_MODE | typeof CARD_MODE;
export type ThemeType = typeof LIGHT_MODE | typeof DARK_MODE;

export type roles = typeof ADMIN_ROLE | typeof USER_ROLE | typeof OWNER_ROLE;

export type UserType = {
    id?: string;
    name: string;
    email: string;
    role: roles;
    image: string;
};
