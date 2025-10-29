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

export function useCountriesQuery() {
    const {
        data: countries, 
        error: countriesErr,
        isLoading: countriesLoad, 
        refetch: countriesRefetch,
        isPlaceholderData: countriesPlaceholder,
    } = useQuery({
        ...SearchApi.getCountriesQuery(), 
        placeholderData: keepPreviousData
    });

    return {
        countries,
        countriesErr,
        countriesLoad,
        countriesRefetch,
        countriesPlaceholder,
    };
}

