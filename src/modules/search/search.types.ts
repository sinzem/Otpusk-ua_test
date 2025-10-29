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

export type GeoResponse = Record<string, GeoEntityType>;