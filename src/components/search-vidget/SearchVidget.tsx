import styles from "./SearchVidget.module.css";
import { HotelList } from "../hotel-list/HotelList";
import { SearchForm } from "../search-form/SearchForm";

const SearchVidget = () => {
    return (
        <div className={styles.wrapper}>
            <SearchForm />
            <HotelList />
        </div>
    );
};

export  { SearchVidget };