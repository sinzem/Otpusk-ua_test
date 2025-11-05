import styles from "./HotelsList.module.css";
import { HotelCard } from "../hotel-card/HotelCard";
import { useGetHotelsQuery, useSearchPricesQuery } from "../../modules/search/use-search-hooks";
import { useSearchStore } from "../../modules/search/search.store";
import { useEffect, useMemo } from "react";
import type { HotelPriceType } from "../../modules/search/search.types";


const HotelsList = () => {
    const { hotels, setHotels, setCache, token, tokenPrev, setTokenPrev, searchPricesPermit, countryId } = useSearchStore();

    const {searchPrices, searchPricesErr} = useSearchPricesQuery({token, queryPermit: searchPricesPermit});
    const {searchHotels, searchHotelsErr} = useGetHotelsQuery({countryId, permit: searchPricesPermit});

    useEffect(() => {
        if (tokenPrev === token) return;

        setTokenPrev(token);
        const hotelsList: HotelPriceType[] = [];
        const prices = searchPrices ? Object.values(searchPrices.prices) : [];
        const hotels = searchHotels ? searchHotels : {};
    
        prices.map(price => {
            if ("hotelID" in price && typeof price.hotelID === "string") {
                hotelsList.push({...hotels[price.hotelID], ...price})
            }
        });

        setHotels(hotelsList);
        setCache(countryId, hotelsList);
    }, [searchPrices])

    const memoHotels = useMemo(() => hotels, [hotels]);

    if (searchHotelsErr || searchPricesErr) {return <div className={styles.list}>Помилка отримання данних. Спробуйте ще раз.</div>}

    return (
        <div className={styles.list}>
            {!hotels.length &&
                    <h2 style={{marginLeft: "16px"}}>No data...</h2>
            }
            {memoHotels.length > 0 && 
                memoHotels.map((hotel, i) => (
                    <div key={hotel.id}>
                        <HotelCard data={hotel} appearDelay={i / 5}/>
                    </div>
                ))
            }
        </div>
    );
};

export { HotelsList };