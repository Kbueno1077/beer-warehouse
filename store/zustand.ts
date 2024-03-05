import { create } from "zustand";
import { BeerType, LIGHT_MODE, ModeType, ThemeType } from "@/util/types";

type MlFilterType = {
    operand: string;
    mlValue: number;
};

type CountryFilterType = {
    value: string;
    label: string;
};

type Filters = {
    alcoholFilters: Array<string>;
    mlFilters: MlFilterType;
    countryFilters: Array<CountryFilterType>;
    impressionFilters: Object;
    search: string;
};

export type SortType = {
    attribute: string;
    direction: string;
};

export type GroupByType = String;

type BeerStore = {
    //LOAD
    allBeers: Array<BeerType>;
    setAllBeers: Function;

    //THEME MODE RESET
    theme: ThemeType;
    setTheme: Function;
    mode: ModeType | null;
    setMode: Function;
    resetFilters: Function;
    resetSort: Function;
    resetGroupBy: Function;

    //CHANGE
    filters: Filters;
    sort: SortType;
    groupBy: GroupByType;

    changeFilters: Function;
    changeSort: Function;
    changeGroupBy: Function;

    //CRUD
    deleteBeerUI: Function;
    addBeerUI: Function;
    updateBeerUI: Function;
};

export const useBeerStore = create<BeerStore>((set, get) => ({
    //   STATES
    theme: LIGHT_MODE,
    mode: null,
    allBeers: [],

    filters: {
        alcoholFilters: ["soft", "normal", "high", "extra", "hardcore"],
        mlFilters: {
            operand: "GET",
            mlValue: -1,
        },
        countryFilters: [],
        impressionFilters: {},
        search: "",
    },
    sort: { attribute: "", direction: "" },
    groupBy: "",

    //  ACTIONS
    setTheme: (theme: ThemeType) => {
        set({ theme });
        document.documentElement.className = theme;
        document.documentElement.setAttribute("data-mode", theme);
    },

    setMode: (mode: ModeType) => {
        get().resetFilters();
        get().resetSort();
        get().resetGroupBy();
        set({ mode });
    },
    setAllBeers: (allBeers: Array<BeerType>) => set({ allBeers }),

    changeFilters: (filters: Filters) => {
        set({ filters });
    },

    changeSort: (sort: SortType) => {
        set({ sort });
    },
    changeGroupBy: (groupBy: GroupByType) => {
        set({ groupBy });
    },

    //CRUD
    deleteBeerUI: (id: string) => {
        const allBeers = get().allBeers;
        const newBeers = allBeers.filter((beer) => beer.id !== id);
        set({ allBeers: newBeers });
    },

    addBeerUI: (newBeer: BeerType) => {
        const allBeers = get().allBeers;
        set({ allBeers: [...allBeers, newBeer] });
    },

    updateBeerUI: (newBeer: BeerType) => {
        const allBeers = get().allBeers;
        const updatedBeers = allBeers.map((beer) =>
            beer.id !== newBeer.id ? beer : newBeer
        );
        set({ allBeers: updatedBeers });
    },

    //RESET
    resetFilters: () => {
        set({
            filters: {
                alcoholFilters: ["soft", "normal", "high", "extra", "hardcore"],
                mlFilters: {
                    operand: "GET",
                    mlValue: -1,
                },
                countryFilters: [],
                impressionFilters: {},
                search: "",
            },
        });
    },
    resetSort: () => {
        set({ sort: { attribute: "", direction: "" } });
    },
    resetGroupBy: () => {
        set({ groupBy: "" });
    },
}));
