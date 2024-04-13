import { createStore } from "zustand";
import { BeerType, ModeType, ThemeType } from "@/util/types";
import { getXataClient } from "@/xata/xata";

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

interface BeerProps {
    //LOAD
    warehouseOwner: String | null;
    loading: boolean;
    allBeers: Array<BeerType>;
    setAllBeers: Function;

    //THEME MODE RESET
    setLoading: Function;
    mode: ModeType | null;
    setMode: Function;
    resetFilters: Function;
    resetSort: Function;
    resetGroupBy: Function;

    //
    handleWarehouseChange: Function;
    setWarehouseOwner: Function;

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
}

export interface BeerState extends BeerProps {}

export type BeerStore = ReturnType<typeof createBeerStore>;

type DefaultProps = {
    warehouseOwner: string;
};

type InitialProps = {
    mode: ModeType | null;
};

export const createBeerStore = (initProps: InitialProps) => {
    const DEFAULT_PROPS: DefaultProps = {
        warehouseOwner: "Kevin",
    };

    return createStore<BeerState>((set, get) => ({
        //   STATES
        ...DEFAULT_PROPS,
        ...initProps,
        loading: true,
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
        setLoading: (loading: boolean) => {
            set({ loading });
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
            const newBeers = allBeers.filter(
                (beer: BeerType) => beer.id !== id
            );
            set({ allBeers: newBeers });
        },

        addBeerUI: (newBeer: BeerType) => {
            const allBeers = get().allBeers;
            set({ allBeers: [...allBeers, newBeer] });
        },

        updateBeerUI: (newBeer: BeerType) => {
            const allBeers = get().allBeers;
            const updatedBeers = allBeers.map((beer: BeerType) =>
                beer.id !== newBeer.id ? beer : newBeer
            );
            set({ allBeers: updatedBeers });
        },

        //
        handleWarehouseChange: async (newWarehouseOwner: string) => {
            const xata = getXataClient();
            get().setLoading(true);

            get().resetFilters();
            get().resetGroupBy();
            get().resetSort();

            let serverFetchedBeers: any = [];

            if (newWarehouseOwner !== "Kevin") {
                serverFetchedBeers = await xata.db.usersBeers
                    .select([
                        "id",
                        "name",
                        "alcohol_percentage",
                        "ml",
                        "country",
                        "initial_impression",
                        "bought_in",
                        "evidence_img",
                        "additional_comments",
                        "owner",
                    ])
                    .filter({ owner: newWarehouseOwner })
                    .sort("name", "asc")
                    .getAll();
            } else {
                serverFetchedBeers = await xata.db.beers
                    .select([
                        "id",
                        "name",
                        "alcohol_percentage",
                        "ml",
                        "country",
                        "initial_impression",
                        "bought_in",
                        "evidence_img",
                        "additional_comments",
                    ])
                    .sort("name", "asc")
                    .getAll();
            }

            get().setAllBeers(serverFetchedBeers);
            get().setWarehouseOwner(newWarehouseOwner);
            get().setLoading(false);
        },

        setWarehouseOwner: (warehouseOwner: string) => {
            set({ warehouseOwner });
        },

        //RESET
        resetFilters: () => {
            set({
                filters: {
                    alcoholFilters: [
                        "soft",
                        "normal",
                        "high",
                        "extra",
                        "hardcore",
                    ],
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
};
