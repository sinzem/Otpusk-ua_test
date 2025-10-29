import { queryOptions } from '@tanstack/react-query';
import { getCountries } from '../../db/api.ts';
import { jsonApiInstance } from '../../shared/api/api-instance.ts';

type CountryType = {
  name: string;
  id: string;
  flag: string;
}

export const CountriesListApi = {
    baseKey: 'countries',

    getCountriesQuery: () => {
        return queryOptions({
            queryKey: [CountriesListApi.baseKey, 'list'],
            queryFn: () => jsonApiInstance<Record<number, CountryType>>(getCountries)
            // queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())
        });
    },

    
};
