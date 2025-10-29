import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { SearchApi } from './search.api';

export function useGeosQuery(search: string) {
    const {
        data: geos, 
        error: geosErr,
        isLoading: geosLoad, 
        refetch: geosRefetch,
        isPlaceholderData: geoPlaceholder,
    } = useQuery({
        ...SearchApi.getGeoQuery(search), 
        placeholderData: keepPreviousData
    });

    return {
        geos,
        geosErr,
        geosLoad,
        geosRefetch,
        geoPlaceholder,
    };
}
