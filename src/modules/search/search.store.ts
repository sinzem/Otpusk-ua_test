import { create } from "zustand";

interface SearchStore {
    token: string;
    countryId: string;
    searchPricesPermit: boolean;
    // hotels: HotelPriceType[];

    setToken: (token: string) => void;
    setCountryId: (countryId: string) => void;
    setSearchPricesPermit: (searchPricesPermit: boolean) => void;
    // setHotels: (hotels: HotelPriceType[]) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
    token: "",
    countryId: "",
    searchPricesPermit: false,
    hotels: [],

    setToken: (token) => {
        set(() => ({token}));
    },
    setCountryId: (countryId) => {
        set(() => ({countryId}));
    },
    setSearchPricesPermit: (searchPricesPermit) => {
        set(() => ({searchPricesPermit}));
    },
    // setHotels: (hotels) => {
    //     set(() => ({hotels}));
    // },
}))