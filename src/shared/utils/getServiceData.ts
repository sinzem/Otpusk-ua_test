const getServiceData = ({str = ""}: {str?: string}): string[] => {
    if (str === "wifi") return ["/img/wifi_freepick_flaticon_com.png", "WI-FI"];
    if (str === "pool") return ["/img/pool_freepick_flaticon_com.png", "Басейн"];
    if (str === "food") return ["/img/cutlery_freepick_flaticon_com.png", "Харчування"];
    if (str === "aquapark") return ["/img/aquapark_freepick_flaticon_com.png", "Аквапарк"];
    if (str === "tennis_court") return ["/img/tennis_court_smashicons_flaticon_com.png", "Тенiсний корт"];
    if (str === "laundry") return ["/img/laundromat_Frey_wazza_flaticon_com.png", "Пральня"];
    if (str === "parking") return ["/img/parking_Freepick_flaticon_com.png", "Паркiнг"];
    return ["/img/wifi_freepick_flaticon_com.png", "WI-FI"]
}

export { getServiceData };