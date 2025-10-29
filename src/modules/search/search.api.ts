import { queryOptions } from '@tanstack/react-query';
import { getCountries, searchGeo } from '../../db/api.ts';
import { jsonApiInstance } from '../../shared/api/api-instance.ts';
import type { CountriesType, GeoResponse } from './search.types.ts';



export const SearchApi = {

    getCountriesQuery: () => {
        return queryOptions({
            queryKey: ['countries', 'list'],
            queryFn: ({signal}) => jsonApiInstance<CountriesType, null>({signal, func: getCountries})
            // queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())
        });
    },

    getGeoQuery: (search: string) => {
        return queryOptions({
            queryKey: ['geo', search],
            queryFn: async ({signal}) => jsonApiInstance<GeoResponse, string>({signal, func: searchGeo, args: search})
        });
    },
};
