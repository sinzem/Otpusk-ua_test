import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { SearchApi } from './search.api';
import { useSearchStore } from './search.store';

export function useGetPriceQuery({
    priceId,
}: {
    priceId: string;
}) {
     const { 
        data: dataPrice, 
        error: dataPriceErr,
        isLoading: dataPriceLoad, 
        isSuccess: dataPriceSuccess,
        refetch: dataPriceRefetch,
    } = useQuery({
        ...SearchApi.GetPriceQuery({priceId}),
        enabled: !!priceId
    });

    return { dataPrice, dataPriceErr, dataPriceLoad, dataPriceSuccess, dataPriceRefetch };
}

export function useGetHotelQuery({
    hotelId,
}: {
    hotelId: number;
}) {
     const { 
        data: dataHotel, 
        error: dataHotelErr,
        isLoading: dataHotelLoad, 
        isSuccess: dataHotelSuccess,
        refetch: dataHotelRefetch,
    } = useQuery({
        ...SearchApi.GetHotelQuery({hotelId}),
        enabled: !!hotelId
    });

    return { dataHotel, dataHotelErr, dataHotelLoad, dataHotelSuccess, dataHotelRefetch };
}

export function useGetHotelsQuery({
    countryId = "",
    permit 
}: {
    countryId: string;
    permit: boolean;
}) {
     const { 
        data: searchHotels, 
        error: searchHotelsErr,
        isLoading: searchHotelsLoad, 
        isSuccess: searchHotelsSuccess,
        refetch: searchHotelsRefetch,
    } = useQuery({
        ...SearchApi.GetHotelsQuery({countryId, permit}),
        enabled: !!countryId && permit
    });

    return { searchHotels, searchHotelsErr, searchHotelsLoad, searchHotelsSuccess, searchHotelsRefetch };
}

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
        isSuccess: searchPricesSuccess,
        refetch: searchPricesRefetch,
    } = useQuery({
        ...SearchApi.SearchPricesQuery({token, queryPermit}),
        enabled: !!token && queryPermit
    });

    return { searchPrices, searchPricesErr, searchPricesLoad, searchPricesSuccess, searchPricesRefetch };
}

// export function useSearchPricesQuery({
//     token = "", 
//     queryPermit
// }: {
//     token: string, 
//     queryPermit: boolean
// }) {
//     const {countryId, setSearchPricesPermit} = useSearchStore();

//     const { 
//         data: searchPrices, 
//         // error: searchPricesErr,
//         // refetch: searchPricesRefetch,
//     } = useQuery({
//         ...SearchApi.SearchPricesQuery({token, queryPermit}),
//     });

//     const permit = searchPrices ? true : false;
//     const country = countryId ? countryId : "";

//     const { 
//         data: searchHotels, 
//         error: searchHotelsErr,
//         refetch: searchHotelsRefetch,
//     } = useQuery({
//         ...SearchApi.GetHotelsQuery({countryId: country, permit}),
//         select: () => setSearchPricesPermit(false)
//     });

//     const prices = searchPrices ? Object.values(searchPrices.prices) : [];
//     const hotels = searchHotels ? searchHotels : {};
  
//     const hotelsList: HotelPriceType[] = [];
//     prices.map(price => {
//         if ("hotelID" in price && typeof price.hotelID === "string") {
//             hotelsList.push({...hotels[price.hotelID], ...price})
//         }
//     });
    
//     return { hotelsList, /* searchPrices, searchPricesErr, searchPricesRefetch, */ /* searchHotels,  */searchHotelsErr, searchHotelsRefetch};
// }

export function useTokenMutation() {
    const {setToken} = useSearchStore();

    const {mutate: tokenMutate, data: token, isError: tokenError} = useMutation({
        ...SearchApi.TokenMutation(),
        onSuccess: (data) => setToken(data.token),
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

