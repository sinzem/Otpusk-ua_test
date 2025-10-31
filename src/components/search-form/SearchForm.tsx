import styles from "./SearchForm.module.css";
import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { Button } from "../../ui/button/Button";
import { Input } from "../../ui/input/Input";
import { SearchList } from "../search-list/SearchList";
import { useIsFetching } from "@tanstack/react-query";
import { LineMessage } from "../../ui/message/LineMessage";
import { showWarning } from "../../shared/utils/showWarning";
import { type CountriesType, type GeoEntityType, type GeoResponseType, type SearchPricesPermitType } from "../../modules/search/search.types";
import { useCountriesQuery, useGeosQuery, useSearchPricesQuery, useTokenMutation } from "../../modules/search/use-search-hooks";

const SearchForm = () => {
    const [search, setSearch] = useState<string>("");
    const [choice, setChoice] = useState<GeoEntityType | null>(null); 
    const [debounceSearch, setDebounceSearch] = useState<string>("");
    const [listOpened, setListOpened] = useState<boolean>(false);
    const [allowGeosQuery, setAllowGeosQuery] = useState<boolean>(false);
    const [showGeos, setShowGeos] = useState<boolean>(true);
    const [warning, setWarning] = useState<{text: string, time: number} | null>(null); 
    const searchRef = useRef<HTMLInputElement>(null);
    const [searchPricesPermit, setSearchPricesPermit] = useState<SearchPricesPermitType>({
        requestAllowed: false,
        requests: 0,
        delay: 0,
    }); 

    const {countries} = useCountriesQuery();
    const {geos} = useGeosQuery(debounceSearch);
    const {token, tokenMutate} = useTokenMutation();
    const {searchPrices, searchPricesRefetch, searchPricesErr} = useSearchPricesQuery({
        token: token?.token || "", queryPermit: searchPricesPermit.requestAllowed
    });

    const isFetching = useIsFetching();

    const data = search && showGeos ? geos : countries;
 
    useEffect(() => {
        setSearch("");
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
        setSearchPricesPermit({requestAllowed: false, requests: 0, delay: 0});
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        if (searchPrices && choice) {
            setChoice(null);
            setSearchPricesPermit({requestAllowed: false, requests: 0, delay: 0});
            setSearch("");
            showWarning({text: "Дані успiшно отримані (поки що в консолi)", time: 2500}, setWarning);
            if (searchRef.current) searchRef.current.focus(); 
            console.log(searchPrices);
        }
    }, [searchPrices]);
   
    useEffect(() => {
        if (!searchPricesErr) return;
        if ("status" in searchPricesErr && searchPricesErr.status === 425) {
            if (searchPricesPermit.requests < 2) {
                showWarning({text: "Пошук даних", time: searchPricesPermit.delay}, setWarning);

                setTimeout(() => {
                    setSearchPricesPermit({requestAllowed: true, requests: searchPricesPermit.requests + 1, delay: searchPricesPermit.delay});
                    searchPricesRefetch();
                    setWarning(null);
                }, searchPricesPermit.delay);
            } else {
                setSearchPricesPermit({requestAllowed: false, requests: 0, delay: 0});
                showWarning({text: "Перевищено допустиму кiлькiсть запитiв, спробуйте ще", time: 2000}, setWarning);
            }
        } else {
            setSearchPricesPermit({requestAllowed: false, requests: 0, delay: 0});
            showWarning({text: "Cталася помилка, спробуйте ще раз", time: 2500}, setWarning);
        }
    }, [searchPricesErr]);

    useEffect(() => {
        if (token && searchPricesPermit.requests < 2) {
            const wait = token.waitUntil ?? Date.now();
            const delay = Date.now() - new Date(wait).getTime();
            
            showWarning({text: "Пошук даних", time: delay}, setWarning);

            setTimeout(() => {
                setSearchPricesPermit({requestAllowed: true, requests: searchPricesPermit.requests + 1, delay});
                searchPricesRefetch();
                setWarning(null);
            }, delay);
        }
    }, [token]);

    const clickOnInput = async (e: MouseEvent<HTMLDivElement>) => {
         const target = e.target as HTMLElement | null;
        if (target && target.dataset && (target.dataset.close === "close" || Object.values(target.dataset).includes("close"))) return;

        if (warning || isFetching) return;

        setSearchPricesPermit({requestAllowed: false, requests: 0, delay: 0});
        if (!search) {
            setListOpened(true);
            setChoice(null);
            return;
        } else {
            if (choice) {
                if ("countryId" in choice) tokenMutate(choice.countryId);
            } else {
                setShowGeos(false);
                setListOpened(true);
                return;
            }
        }
    }

    const sendForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (warning || isFetching) return;

        if (!choice) {
            showWarning({text: "Виберiть мiсто або готель зi списку", time: 2500}, setWarning);
            return;
        };
        
        if (choice && "countryId" in choice) {
            setSearchPricesPermit({requestAllowed: false, requests: 0, delay: 0});
            tokenMutate(choice.countryId);
        };
    }


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