import { useIsFetching } from "@tanstack/react-query";
import { useIsMutating } from '@tanstack/react-query'

const Loader = () => {
    const isFetching = useIsFetching();
    const isMutating = useIsMutating()
    const isLoading = isFetching > 0 || isMutating > 0

    if (isLoading) {
        return (
            <div className="fixed left-15 bottom-10 bg-transparent">
                <img src="/loader.gif" alt="loader" />
            </div>
        );
    }
};

export { Loader };