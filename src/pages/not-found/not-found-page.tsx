import styles from "./not-found-page.module.css";

const NotFoundPage = () => {
    return (
        <div className={`page ${styles.wrapper}`}>
            <h2>Page not found...</h2>
        </div>
    );
};

export { NotFoundPage };