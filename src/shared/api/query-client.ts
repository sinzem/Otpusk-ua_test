import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // gcTime: 5 * 60 * 1000,
            // staleTime: 1 * 60 * 1000,
        },
    },
});
