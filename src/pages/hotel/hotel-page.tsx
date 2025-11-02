import styles from "./hotel-page.module.css";
import { HotelInfo } from "../../components/hotel-info/HotelInfo";


const HotelPage = () => {
    return (
        <div className={`page ${styles.wrapper}`}>
            <HotelInfo />
        </div>
    );
};

export { HotelPage };