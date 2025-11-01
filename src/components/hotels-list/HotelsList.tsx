import styles from "./HotelsList.module.css";
import { HotelCard } from "../hotel-card/HotelCard";
import { useGetHotelsQuery, useSearchPricesQuery } from "../../modules/search/use-search-hooks";
import { useSearchStore } from "../../modules/search/search.store";
import { useEffect, useState } from "react";
import type { HotelPriceType } from "../../modules/search/search.types";


const HotelsList = () => {
    const [hotels, setHotels] = useState<HotelPriceType[]>([]);
    const [country, setCountry] = useState<string>("");
    const { token, searchPricesPermit, countryId } = useSearchStore();

    const {searchPrices, searchPricesErr} = useSearchPricesQuery({token, queryPermit: searchPricesPermit});
    const {searchHotels, searchHotelsErr} = useGetHotelsQuery({countryId, permit: searchPricesPermit});

    useEffect(() => {
        if (country === countryId) return;
        setCountry(countryId);
        const hotelsList: HotelPriceType[] = [];
        const prices = searchPrices ? Object.values(searchPrices.prices) : [];
        const hotels = searchHotels ? searchHotels : {};
    
        prices.map(price => {
            if ("hotelID" in price && typeof price.hotelID === "string") {
                hotelsList.push({...hotels[price.hotelID], ...price})
            }
        });
        console.log("render");
        setHotels(hotelsList);
    }, [searchPrices])
    
    if (searchHotelsErr || searchPricesErr) {return <div className={styles.list}>Помилка отримання данних. Спробуйте ще раз.</div>}

    return (
        <div className={styles.list}>
            {!hotels.length &&
                    <h2 style={{marginLeft: "16px"}}>No data...</h2>
            }
            {hotels.length > 0 && 
                hotels.map(hotel => (
                    <div key={hotel.id}>
                        <HotelCard data={hotel} />
                    </div>
                ))
            }
        </div>
    );
};

export { HotelsList };