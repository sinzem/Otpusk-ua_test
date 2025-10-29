import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useCountriesQuery, useGeosQuery } from "../modules/search/use-search-hooks";
import { SearchList } from "./SearchList";
import { type CountriesType, type GeoEntityType, type GeoResponse } from "../modules/search/search.types";
import { useIsFetching } from "@tanstack/react-query";
import LineMessage from "../ui/LineMessage";

const SearchForm = () => {
    const [search, setSearch] = useState<string>("");
    const [choise, setChoise] = useState<GeoEntityType | null>(null);
    const [debounceSearch, setDebounceSearch] = useState<string>("");
    const [listOpened, setListOpened] = useState<boolean>(false);
    const [allowGeosQuery, setAllowGeosQuery] = useState<boolean>(false);
    const [showGeos, setShowGeos] = useState<boolean>(true);
    const [warning, setWarning] = useState<string | null>(null); 
    const searchRef = useRef<HTMLInputElement>(null);

    const {countries} = useCountriesQuery();
    const {geos} = useGeosQuery(debounceSearch);
    const isFetching = useIsFetching();
    
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

    const clickOnInput = async (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
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
        if (!choise) {
            setWarning("Виберiть мiсто або готель зi списку");
            const timeout = setTimeout(() => setWarning(null), 3000)
            return () => clearTimeout(timeout); 
        }
    }

    return (
        <form 
            className="relative flex flex-col items-center justify-center gap-3 rounded-lg p-5 border border-gray-500 bg-white xl:w-[400px] lg:w-[360px] w-[300px]"
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
            <Button disabled={isFetching ? true : false} opacity={isFetching ? ".5" : "1"}/>
            {warning && 
                <LineMessage text={warning}/>
            }
        </form>
    );
};

export { SearchForm };