import styles from "./HotelCard.module.css";
import type { HotelPriceType } from "../../modules/search/search.types";
import { useCountriesQuery } from "../../modules/search/use-search-hooks";
import { memo, useState, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

const HotelCard = memo(({
    data,
    appearDelay = 0,
}: {
    data: HotelPriceType,
    appearDelay?: number;
}) => {

    const navigate = useNavigate();

    const [priceVisibility, setPriceVisibility] = useState(false);
    const {countries} = useCountriesQuery();

    const flag = countries && countries[data.countryId] ? countries[data.countryId].flag : "/img/location_Freepik_flaticon_com.png";

    const hotelCardClick = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement | null;
        if (target && target.dataset && target.dataset.price) return;
        
        if ("hotelID" in data && typeof data.hotelID === "string") {
            const id = `/hotel/${data.hotelID}_${data.id}`
            navigate(id, {relative: "path"})
        }
    }
    
    return (
        <div className={styles.card} 
            style={{animationDelay: `${appearDelay}s`}}
            onClick={(e) => hotelCardClick(e)}
        >
            <div className={styles.img}>
                <img src={data.img} alt="hotel image" />
            </div>
            <div className={styles.position}>
                <h2 className={styles.title}>{data.name}</h2>
                <div className={styles.location}>
                    <div className={styles.flag}>
                        {<img src={flag} alt="flag" />}
                    </div>
                    <h3>{data.countryName}, {data.cityName}</h3>
                </div>
            </div>
            <div className={styles.begin}>
                <h3>Старт туру</h3>
                <h4>{data.startDate.replace(/-/g, ".")}</h4>
            </div>
            <div 
                style={{opacity: priceVisibility ? 1 : 0}} 
                className={styles.price}
            >
                {data.amount.toLocaleString()} {data.currency}
            </div>
            <div 
                data-price
                className={styles.open}
                onClick={() => setPriceVisibility(!priceVisibility)}
            >
                {priceVisibility ? "Приховати цiну" : "Вiдкрити цiну"}
                
            </div>
        </div>
    );
});

export { HotelCard };