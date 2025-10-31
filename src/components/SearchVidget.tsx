import { HotelList } from "./HotelList";
import { SearchForm } from "./SearchForm";

const SearchVidget = () => {
    return (
        <div className="flex flex-col gap-3 xl:w-[454px] lg:w-[360px] w-[300px]">
            <SearchForm />
            <HotelList />
        </div>
    );
};

export  { SearchVidget };