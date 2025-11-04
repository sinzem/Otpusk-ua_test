import styles from "./SearchVidget.module.css";
import { HotelsList } from "../hotels-list/HotelsList";
import { SearchForm } from "../search-form/SearchForm";

const SearchVidget = () => {
    
    return (
        <div className={styles.wrapper}>
            <SearchForm />
            <HotelsList />
        </div>
    );
};

export  { SearchVidget };