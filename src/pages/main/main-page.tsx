import { SearchVidget } from "../../components/search-vidget/SearchVidget";
import styles from "./main-page.module.css";

const MainPage = () => {
  
    return (
        <div className={`page ${styles.wrapper}`}> 
            <SearchVidget />
        </div>
    )
}

export { MainPage };