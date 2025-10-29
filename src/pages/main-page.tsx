import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { CountriesListApi } from "../modules/countries/countries.api";
import { Button } from "../shared/ui/Button";
import { Input } from "../shared/ui/Input";
import { useEffect, useRef, useState } from "react";

const MainPage = () => {
    const [search, setSearch] = useState<string>("");
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.focus(); 
        }
    }, []);

    const {data} = useQuery({
        ...CountriesListApi.getCountriesQuery(),
        placeholderData: keepPreviousData 
    });
  
    return (
        <div>
            <Button text="It is Button" width="full" />
            <Input id="search" type="text" value={search} setChange={setSearch} placeholder="Hello" inputRef={searchRef}/> 
            {data && Object.values(data).map(country => (
                <div key={country.id}>
                    {country.name}
                </div>
            ))}
        </div>
    )
}

export { MainPage };