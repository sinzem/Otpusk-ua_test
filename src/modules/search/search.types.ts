export type CountryType = { id: string; name: string; flag: string };
export type CityType    = { id: number; name: string };
export type HotelType   = {
  id: number;
  name: string;
  img: string;
  cityId: number;
  cityName: string;
  countryId: string;
  countryName: string;
};

export type CountriesType = Record<string, CountryType>;
export type HotelsType    = Record<string, HotelType>;

export type GeoEntityType =
  | (CountryType & { type: "country" })
  | (CityType    & { type: "city" })
  | (HotelType   & { type: "hotel" });

export type GeoResponseType = Record<string, GeoEntityType>;

export type StartSearchResponseType = {
  token: string;
  waitUntil: string;      
};

export type PriceOfferType = {
  id: string;           // UUID
  amount: number;       // 1500–4000
  currency: "usd";      // нижній регістр за поточною реалізацією
  startDate: string;    // YYYY-MM-DD (сьогодні +2..5)
  endDate: string;      // YYYY-MM-DD (start +4..7)
  hotelID?: string;     // додається в результатах пошуку цін
};

export type PricesMapType = Record<string, PriceOfferType>;

export type GetSearchPricesResponseType = {
  prices: PricesMapType;
};

export type SearchPricesPermitType = {
  requestAllowed: boolean;
  requests: number;
  delay: number;
}
