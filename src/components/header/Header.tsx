import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
    return (
        <div className={styles.header}>
            <nav className={styles.navigation}>
                <NavLink className={styles.path} end to="/">Home</NavLink>
                <NavLink className={styles.path} end to="/about">About</NavLink>
            </nav>
        </div>
    )
}

export { Header };