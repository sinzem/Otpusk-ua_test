import { useParams } from "react-router-dom";
import styles from "./HotelInfo.module.css";
import { useCountriesQuery, useGetHotelQuery, useGetPriceQuery } from "../../modules/search/use-search-hooks";
import { useState } from "react";

const HotelInfo = () => {
    const [priceVisibility, setPriceVisibility] = useState(false);

    const { id } = useParams<{ id: string }>();
    const str = id ? id : "";
    
    const [hotelId, priceId] = str.split("_");

    const {dataHotel} = useGetHotelQuery({hotelId: hotelId ? +hotelId : 0});
    const {dataPrice} = useGetPriceQuery({priceId: priceId ? priceId : ""});

    const {countries} = useCountriesQuery();
    
    const flag = countries 
        && dataHotel 
        && "countryId" in dataHotel 
        && countries[dataHotel.countryId] 
        ? countries[dataHotel.countryId].flag 
        : "/img/location_Freepik_flaticon_com.png";

    if (!dataHotel || !dataPrice || !id || !hotelId || !priceId) return <div>Помилка пошуку даних готелю</div>;
    if (!Object.keys(dataHotel).length  || !Object.keys(dataPrice).length) return <div>Помилка пошуку даних готелю</div>;

    return (
        <div className={styles.hotel}>
            <div className={styles.img}>
                <img src={dataHotel.img} alt="hotel image" />
            </div>
            <div className={styles.name}>{dataHotel.name}</div> 
            <div className={styles.location}>
                <div className={styles.country}>
                    <div className={styles.flag}>
                        {<img src={flag} alt="flag" />}
                    </div>
                    <h3>{dataHotel.countryName}, </h3>
                </div>
                <div className={styles.city}>
                    <div className={styles.flag}>
                        {<img src={"/img/location_Freepik_flaticon_com.png"} alt="location" />}
                    </div>
                    <h3>{dataHotel.cityName}</h3>
                </div>
            </div>
            <div className={styles.description}>
                <h3>Опис</h3>
                <p>Комфортабельний готель з видом на море, пропонує вiдмiнний сервiс та широкий спектр зручностей</p>
            </div>
            <div className={styles.services}>
                <h3>Сервiси</h3>
                <div className={styles.services_line}>
                    <div className={styles.service}>
                        <div className={styles.flag}>
                            <img src="/img/wifi_freepick_flaticon_com.png" alt="wi-fi" />
                        </div>
                        <h3>WI-FI</h3>
                    </div>
                    <div className={styles.service}>
                        <div className={styles.flag}>
                            <img src="/img/pool_freepick_flaticon_com.png" alt="wi-fi" />
                        </div>
                        <h3>Басейн</h3>
                    </div>
                    <div className={styles.service}>
                        <div className={styles.flag}>
                            <img src="/img/cutlery_freepick_flaticon_com.png" alt="wi-fi" />
                        </div>
                        <h3>Харчування</h3>
                    </div>
                </div>
            </div>
            <div className={styles.date}>
                <div className={styles.flag}>
                    <img src="/img/calendar_freepick_flaticon_com.png" alt="wi-fi" />
                </div>
                <h4>{dataPrice.startDate.replace(/-/g, ".")} - {dataPrice.endDate.replace(/-/g, ".")} </h4>
            </div>
            <div className={styles.price_block}>
                <div 
                    style={{opacity: priceVisibility ? 1 : 0}} 
                    className={styles.price}
                >
                    {dataPrice.amount.toLocaleString()} <span>{dataPrice.currency}</span>
                </div>
                <div 
                    data-price
                    className={styles.open}
                    onClick={() => setPriceVisibility(!priceVisibility)}
                >
                    {priceVisibility ? "Приховати цiну" : "Вiдкрити цiну"}
                </div>
            </div>
        </div>
    );
};

export { HotelInfo };