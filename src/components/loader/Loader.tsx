import styles from "./Loader.module.css";
import { useIsFetching } from "@tanstack/react-query";
import { useIsMutating } from '@tanstack/react-query'

const Loader = () => {
    const isFetching = useIsFetching();
    const isMutating = useIsMutating()
    const isLoading = isFetching > 0 || isMutating > 0

    if (isLoading) {
        return (
            <div className={styles.loader}>
                <img src="/img/loader.gif" alt="loader" />
            </div>
        );
    }
};

export { Loader };