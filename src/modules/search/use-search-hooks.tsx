import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { SearchApi } from './search.api';

export function useSearchPricesQuery({
    token = "", 
    queryPermit
}: {
    token: string, 
    queryPermit: boolean
}) {
    const { 
        data: searchPrices, 
        error: searchPricesErr,
        isLoading: searchPricesLoad, 
        isSuccess: searcPricesSuccess,
        refetch: searchPricesRefetch,
    } = useQuery({
        ...SearchApi.SearchPricesQuery({token, queryPermit})
    });

    return { searchPrices, searchPricesErr, searchPricesLoad, searchPricesRefetch, searcPricesSuccess };
}

export function useTokenMutation() {
    const {mutate: tokenMutate, data: token, isError: tokenError} = useMutation({
        ...SearchApi.TokenMutation()
    });

    return { tokenMutate, tokenError, token };
}

export function useGeosQuery(search: string) {
    const {
        data: geos, 
        error: geosErr,
        isLoading: geosLoad, 
        refetch: geosRefetch,
        isPlaceholderData: geoPlaceholder,
    } = useQuery({
        ...SearchApi.GeoQuery(search), 
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
        ...SearchApi.CountriesQuery(), 
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

