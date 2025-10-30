import { useIsFetching } from "@tanstack/react-query";
import type { CountriesType, CountryType, GeoEntityType, GeoResponseType } from "../modules/search/search.types";
import { getFlag } from "../shared/utils/getFlag";

const SearchList = ({
    data,
    onClick,
    isOpened,
    setChoice,
    setAllowGeosQuery,
    warning,
}: {
    data: GeoResponseType | CountriesType | undefined;
    onClick: React.Dispatch<React.SetStateAction<string>>;
    isOpened: React.Dispatch<React.SetStateAction<boolean>>;
    setChoice: React.Dispatch<React.SetStateAction<GeoEntityType | null>>;
    setAllowGeosQuery: React.Dispatch<React.SetStateAction<boolean>>;
    warning: string | null;
}) => {

    const isFetching = useIsFetching();

    const choise = (obj: GeoEntityType | CountryType) => {
        if (!isFetching && !warning) {
            onClick(obj.name);
            isOpened(false);
            setAllowGeosQuery(false);
            if ("type" in obj && (obj.type === "city" || obj.type === "hotel")) {
                setChoice(obj);
            } else {
                setChoice(null);
            };
        }
    }
 
    return (
        <ul className="w-full flex flex-col gap-3 rounded-lg border border-gray-500 p-4">
            {data && Object.keys(data).length === 0 && 
                <li>Немає даних...</li>
            }
            {data && typeof data !== "undefined" && Object.values(data).map(obj => (
                <li 
                    key={obj.id} 
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => choise(obj)}
                >
                    <img className="h-4" src={!obj.type ? obj.flag : getFlag(obj)} alt="flag" />
                    {obj.name}
                </li>
            ))}
        </ul>
    );
};

export  { SearchList };