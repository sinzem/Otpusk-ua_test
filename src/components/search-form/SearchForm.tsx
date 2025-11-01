import styles from "./SearchForm.module.css";
import { useCallback, useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { Button } from "../../ui/button/Button";
import { Input } from "../../ui/input/Input";
import { SearchList } from "../search-list/SearchList";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { LineMessage } from "../../ui/message/LineMessage";
import { showWarning } from "../../shared/utils/showWarning";
import { type CountriesType, type GeoEntityType, type GeoResponseType } from "../../modules/search/search.types";
import { useCountriesQuery, useGeosQuery, /* useSearchPricesQuery, */ useTokenMutation } from "../../modules/search/use-search-hooks";
import { useSearchStore } from "../../modules/search/search.store";
import { SearchApi } from "../../modules/search/search.api";

const SearchForm = () => {
    const searchRef = useRef<HTMLInputElement>(null);

    const [search, setSearch] = useState<string>("");
    const [choice, setChoice] = useState<GeoEntityType | null>(null); 
    const [debounceSearch, setDebounceSearch] = useState<string>("");
    const [listOpened, setListOpened] = useState<boolean>(false);
    const [allowGeosQuery, setAllowGeosQuery] = useState<boolean>(false);
    const [showGeos, setShowGeos] = useState<boolean>(true);
    const [warning, setWarning] = useState<{text: string, time: number} | null>(null); 
    const [searchPricesRequests, setSearchPricesRequests] = useState<number>(0);
    const [searchPricesDelay, setSearchPricesDelay] = useState<number>(0);
    const {/* countryId, */ searchPricesPermit, setSearchPricesPermit} = useSearchStore();

    const {countries} = useCountriesQuery();
    const {geos} = useGeosQuery(debounceSearch);
    const {token, tokenMutate} = useTokenMutation();

    const { 
        data: searchPrices, 
        error: searchPricesErr,
        refetch: searchPricesRefetch,
    } = useQuery({
        ...SearchApi.SearchPricesQuery({token: token?.token ?? "", queryPermit: searchPricesPermit}),
    });

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
        setChoice(null);
        setSearchPricesPermit(false);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        if (searchPrices && choice) {
            setChoice(null);
            setSearch("");
            showWarning({text: "Дані успiшно отримані.", time: 2500}, setWarning);
            if (searchRef.current) searchRef.current.focus(); 
        }
    }, [searchPrices]);
   
    useEffect(() => {
        if (!searchPricesErr) return;
        if ("status" in searchPricesErr && searchPricesErr.status === 425) {
            if (searchPricesRequests < 2) {
                showWarning({text: "Пошук даних", time: searchPricesDelay}, setWarning);

                setTimeout(() => {
                    setSearchPricesPermit(true);
                    setSearchPricesRequests(prev => prev + 1);
                    searchPricesRefetch();
                    setWarning(null);
                }, searchPricesDelay);
            } else {
                setSearchPricesPermit(false);
                setSearchPricesRequests(0);
                showWarning({text: "Перевищено допустиму кiлькiсть запитiв, спробуйте ще", time: 2500}, setWarning);
            }
        } else {
            setSearchPricesPermit(false);
            setSearchPricesRequests(0);
            showWarning({text: "Cталася помилка, спробуйте ще раз", time: 2500}, setWarning);
        }
    }, [searchPricesErr]);

    useEffect(() => {
        if (token && searchPricesRequests < 3) {
            const wait = token.waitUntil ?? Date.now();
            const delay = Date.now() - new Date(wait).getTime();
            
            showWarning({text: "Пошук даних", time: delay}, setWarning);

            setTimeout(() => {
                setSearchPricesPermit(true);
                setSearchPricesRequests(prev => prev + 1);
                setSearchPricesDelay(delay);
                searchPricesRefetch();
                setWarning(null);
            }, delay);
        }
    }, [token]);

    const clickOnInput = useCallback((e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement | null;
        if (target && target.dataset && (target.dataset.close === "close" || Object.values(target.dataset).includes("close"))) return;

        if (warning || isFetching) return;
            setSearchPricesPermit(false);
            setSearchPricesRequests(0);
        if (!search) {
            setListOpened(true);
            setChoice(null);
            return;
        } else {
            if (choice) {
                if ("countryId" in choice) {
                    // if (choice.countryId === countryId) {
                    //     showWarning({text: "Дані цієї країни вже у вікні інформації", time: 2500}, setWarning);
                    //     return;
                    // }
                    tokenMutate(choice.countryId);
                }
            } else {
                setShowGeos(false);
                setListOpened(true);
                return;
            }
        }
    }, [warning, isFetching, search, choice, tokenMutate, setSearchPricesPermit]);

    const sendForm = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (warning || isFetching) return;

        if (!choice) {
            showWarning({text: "Виберiть мiсто або готель зi списку", time: 2500}, setWarning);
            return;
        };
        
        if (choice && "countryId" in choice) {
            // if (choice.countryId === countryId) {
            //     showWarning({text: "Дані цієї країни вже у вікні інформації", time: 2500}, setWarning);
            //     return;
            // }
            setSearchPricesPermit(false);
            setSearchPricesRequests(0);
            tokenMutate(choice.countryId);
        };
    }, [warning, isFetching, choice, tokenMutate, setSearchPricesPermit]);

    return (
        <form 
            className={styles.form}
            onSubmit={(e) => sendForm(e)}
        >
            <h2 className={styles.title}>
                Форма пошуку турiв
            </h2>
            <div
                onClick={(e) => clickOnInput(e)}
                className={styles.inp_wrapper}
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
            {listOpened && data as GeoResponseType | CountriesType && 
                <SearchList 
                    data={data}
                    onClick={setSearch} 
                    isOpened={setListOpened}
                    setChoice={setChoice}
                    setAllowGeosQuery={setAllowGeosQuery}
                    warning={warning}
                />
            }
            <Button 
                disabled={isFetching || warning ? true : false} 
                opacity={isFetching || warning ? ".5" : "1"}
            />
            {warning && 
                <LineMessage data={warning}/>
            }
        </form>
    );
};

export { SearchForm };