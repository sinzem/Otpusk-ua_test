import type { GeoEntityType } from "../../modules/search/search.types";

const getFlag = (obj: GeoEntityType) => {
    if (obj.type === "country") return obj.flag;
    if (obj.type === "city") return "/img/location_Freepik_flaticon_com.png";
    if (obj.type === "hotel") return "img/hotel_Freepik_flaticon_com.png";
}

export { getFlag };