import { useQueryClient } from "@tanstack/react-query";
import { HotelCard } from "./HotelCard";
import { useEffect } from "react";

const HotelList = () => {

    const queryClient = useQueryClient();
    const prices = queryClient.getQueryData(['searchPrices']);

    useEffect(() => {
        if (prices) console.log(prices);
    }, [prices])
    console.log(prices)
    return (
        <div className="relative flex flex-wrap gap-3 rounded-lg p-5 border border-gray-500 bg-white w-full">
            <HotelCard />
            <HotelCard />
        </div>
    );
};

export { HotelList };