import { create } from "zustand";
import type { HotelPriceType } from "./search.types";

interface SearchStore {
    token: string;
    tokenPrev: string;
    countryId: string;
    searchPricesPermit: boolean;
    cache: Map<string, HotelPriceType[]>
    hotels: HotelPriceType[];

    setToken: (token: string) => void;
    setTokenPrev: (tokenPrev: string) => void;
    setCountryId: (countryId: string) => void;
    setSearchPricesPermit: (searchPricesPermit: boolean) => void;
    setCache: (key: string, value: HotelPriceType[]) => void;
    setHotels: (hotels: HotelPriceType[]) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
    token: "",
    tokenPrev: "",
    countryId: "",
    searchPricesPermit: false,
    cache: new Map(),
    hotels: [],

    setToken: (token) => {
        set(() => ({token}));
    },
    setTokenPrev: (tokenPrev) => {
        set(() => ({tokenPrev}));
    },
    setCountryId: (countryId) => {
        set(() => ({countryId}));
    },
    setSearchPricesPermit: (searchPricesPermit) => {
        set(() => ({searchPricesPermit}));
    },
    setCache: (key, value) =>
        set((state) => ({cache: new Map(state.cache).set(key, value)})
    ),
    setHotels: (hotels) => {
        set(() => ({hotels}));
    },
}))