import styles from "./HotelList.module.css";
import { useQueryClient } from "@tanstack/react-query";
import { HotelCard } from "../hotel-card/HotelCard";
import { useEffect } from "react";

const HotelList = () => {

    const queryClient = useQueryClient();
    const prices = queryClient.getQueryData(['searchPrices']);

    useEffect(() => {
        if (prices) console.log(prices);
    }, [prices])
    console.log(prices)
    return (
        <div className={styles.list}>
            <HotelCard />
            <HotelCard />
        </div>
    );
};

export { HotelList };