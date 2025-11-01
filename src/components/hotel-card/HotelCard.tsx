import styles from "./HotelCard.module.css";
import type { HotelPriceType } from "../../modules/search/search.types";
import { useCountriesQuery } from "../../modules/search/use-search-hooks";


const HotelCard = ({
    data
}: {
    data: HotelPriceType
}) => {

    const {countries} = useCountriesQuery();
    const flag = countries && countries[data.countryId] ? countries[data.countryId].flag : "/img/location_Freepik_flaticon_com.png";
  
    return (
        <div className={styles.card} >
            <div className={styles.img}>
                <img src={data.img} alt="hotel image" />
            </div>
            <h2 className={styles.title}>{data.name}</h2>
            <div className={styles.location}>
                <div className={styles.flag}>
                    {<img src={flag} alt="flag" />}
                </div>
            </div>
        </div>
    );
};

export { HotelCard };