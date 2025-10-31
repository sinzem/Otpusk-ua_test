import { queryOptions } from '@tanstack/react-query';
import { getCountries, getSearchPrices, searchGeo, startSearchPrices } from '../../db/api.ts';
import { jsonApiInstance } from '../../shared/api/api-instance.ts';
import type { CountriesType, GeoResponseType, GetSearchPricesResponseType, StartSearchResponseType } from './search.types.ts';



export const SearchApi = {

    CountriesQuery: () => {
        return queryOptions({
            queryKey: ['countries', 'list'],
            queryFn: ({signal}) => jsonApiInstance<CountriesType, null>({func: getCountries, signal})
            // queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())
            // queryFn: (meta) => jsonApiInstance<CountriesType>(url, {signal: meta.signal}) /* (fetch) */
        });
    },

    GeoQuery: (search: string) => {
        return queryOptions({
            queryKey: ['geo', search],
            queryFn: async ({signal}) => jsonApiInstance<GeoResponseType, string>({
                func: (arg?: string) => searchGeo(arg ?? search),
                signal,
                args: search
            }),
            enabled: !!search
            // queryFn: (meta) => jsonApiInstance<CountriesType>(url, {signal: meta.signal}) /* (fetch) */
        });
    },

    TokenMutation: () => {
            return {
                mutationFn: async (countryId: string) => 
                jsonApiInstance<StartSearchResponseType, string>({
                    func: (arg?: string) => startSearchPrices(arg ?? countryId),
                    args: countryId
                })
            }
    },

    SearchPricesQuery: ({
        token = "", 
        queryPermit
    }: {
        token: string;
        queryPermit: boolean;
    }) => {
        return queryOptions({
            queryKey: ['searchPrices', /* token */],
            queryFn: async ({signal}) => jsonApiInstance<GetSearchPricesResponseType, string>({
                func: (arg?: string) => getSearchPrices(arg ?? token),
                signal,
                args: token
            }),
            enabled: !!token && queryPermit
        });
    },
}; 
