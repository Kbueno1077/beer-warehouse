import { createStore } from "zustand";
import { BeerType, ModeType } from "@/util/types";
import { getXataClient } from "@/xata/xata";
import createCookie from "@/app/actions";
import { NextauthUser } from "@next-auth/xata-adapter/dist/xata";

export interface NextAuthUserExtended extends NextauthUser {
    id: string;
    xata: { createdAt: Date; updatedAt: Date };
}

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

export interface BeerProps {
    //LOAD
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

    //  OWNER
    warehouseOwner: NextAuthUserExtended | null;
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
    loading: boolean;
    filters: Filters;
    groupBy: GroupByType;
    sort: SortType;
};

type InitialProps = {
    mode: ModeType | null;
    warehouseOwner: NextAuthUserExtended | null;
};

export const createBeerStore = (initProps: InitialProps) => {
    const DEFAULT_PROPS: DefaultProps = {
        loading: false,
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
        groupBy: "",
        sort: { attribute: "", direction: "" },
    };

    return createStore<BeerState>((set, get) => ({
        //   STATES
        ...DEFAULT_PROPS,
        ...initProps,
        allBeers: [],

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

        // CHANGE OWNER, CHANGE BEERS
        handleWarehouseChange: async (
            newWarehouseOwner: NextAuthUserExtended
        ) => {
            get().setLoading(true);
            get().setWarehouseOwner(newWarehouseOwner);

            const xata = getXataClient();

            get().resetFilters();
            get().resetGroupBy();
            get().resetSort();

            let serverFetchedBeers: any = [];

            if (newWarehouseOwner.name !== "Kevin") {
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
                    .filter({ owner: newWarehouseOwner.name ?? "" })
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

            await createCookie("cookieWarehouseOwner", newWarehouseOwner.name);
            get().setAllBeers(serverFetchedBeers);
            get().setLoading(false);
        },

        // SET BEER OWNER
        setWarehouseOwner: (warehouseOwner: NextAuthUserExtended) => {
            set({ warehouseOwner });
        },

        //RESET
        resetFilters: () => {
            set({
                filters: DEFAULT_PROPS.filters,
            });
        },
        resetSort: () => {
            set({ sort: DEFAULT_PROPS.sort });
        },
        resetGroupBy: () => {
            set({ groupBy: DEFAULT_PROPS.groupBy });
        },
    }));
};
