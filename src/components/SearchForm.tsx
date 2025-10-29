import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { SearchApi } from "../modules/search/search.api";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useGeosQuery } from "../modules/search/use-search-hooks";
import { SearchList } from "./SearchList";
import { type CountriesType, type GeoEntityType, type GeoResponse } from "../modules/search/search.types";

const SearchForm = () => {
    const [search, setSearch] = useState<string>("");
    const [choise, setChoise] = useState<GeoEntityType | null>(null);
    const [debounceSearch, setDebounceSearch] = useState<string>("");
    const [listOpened, setListOpened] = useState<boolean>(false);
    const [allowGeosQuery, setAllowGeosQuery] = useState<boolean>(false);
    const [showGeos, setShowGeos] = useState<boolean>(true);
    const searchRef = useRef<HTMLInputElement>(null);

    const {data: countries, isLoading: isLoadingCountries} = useQuery({
        ...SearchApi.getCountriesQuery(),
        placeholderData: keepPreviousData 
    });

    const {geos} = useGeosQuery(debounceSearch);
    
    const data = search && showGeos ? geos : countries;

    useEffect(() => {
        if (searchRef.current) searchRef.current.focus(); 
    }, []);

    useEffect(() => {
        if (!allowGeosQuery) {
            setAllowGeosQuery(true);
            return;
        };
        const timer = setTimeout(() => setDebounceSearch(search), 500);
        if (search) setListOpened(true);
        setShowGeos(true);
        return () => clearTimeout(timer);
    }, [search]);

    const clickOnInput = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        console.log(e);
        if (!search) {
            setListOpened(true);
            return;
        } else {
            if (choise) {
                console.log(choise);
            } else {
                setShowGeos(false);
                setListOpened(true);
                return;
            }
        }
    }

    const sendForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e, choise);
    }

    return (
        <form 
            className="flex flex-col items-center justify-center gap-3 rounded-lg p-5 border border-gray-500 bg-white xl:w-[400px] lg:w-[360px] w-[300px]"
            onSubmit={(e) => sendForm(e)}
        >
            <h2 className="mx-auto text-xl text-black">
                Форма пошуку турiв
            </h2>
            <div
                onClick={(e) => clickOnInput(e)}
                className="w-full"
            >
                <Input 
                    width="100%"
                    id="search" 
                    type="text" 
                    value={search} 
                    setChange={setSearch} 
                    placeholder="Введiть назву країни, мiста чи готелю" 
                    inputRef={searchRef}
                    buttonDisplay={search.length ? "flex" : "none"}
                />
            </div>
            {listOpened && data as GeoResponse | CountriesType && 
                <SearchList 
                    data={data}
                    onClick={setSearch} 
                    isOpened={setListOpened}
                    setChoise={setChoise}
                    setAllowGeosQuery={setAllowGeosQuery}
                />
            }
            <Button disabled={isLoadingCountries} opacity={isLoadingCountries ? ".5" : "1"}/>
        </form>
    );
};

export { SearchForm };