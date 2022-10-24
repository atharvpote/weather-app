import { Dispatch, useState } from "react";
import {
  MdClose,
  MdOutlineSearch,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import useDebounce from "../utils/useDebounce";
import useCityData from "../utils/useCityData";
import { Coords } from "../utils/useWeather";

type Props = {
  status: boolean;
  showSearch: Dispatch<boolean>;
  setAuto: Dispatch<boolean>;
  setCoords: Dispatch<Coords>;
};

export default function Search({
  status,
  showSearch,
  setAuto,
  setCoords,
}: Props): JSX.Element {
  const [query, setQuery] = useState<string>("");
  const debounceQuery = useDebounce(query, 500);
  const cities = useCityData(debounceQuery);

  return (
    <div
      className={`medium-dark-background absolute top-0 left-0 z-10 h-full w-full bg-black p-4 opacity-100 transition-all ${
        status ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="mb-8 flex justify-end">
        <button onClick={(): void => showSearch(false)}>
          <MdClose className="text-2xl" />
        </button>
      </div>
      <div className="mb-8 flex h-12 gap-4">
        <div className="flex basis-full items-stretch border-2 border-[var(--grey)]">
          <div className="flex items-center px-3">
            <MdOutlineSearch className="fill-[var(--grey)] text-2xl opacity-50" />
          </div>
          <input
            type="text"
            placeholder="Search location"
            className="w-full bg-transparent placeholder:text-[var(--grey)] placeholder:opacity-50 focus:outline-none"
            onChange={(e): void => setQuery(e.target.value)}
          />
        </div>
        <button className="blue-background px-5">Search</button>
      </div>
      <div>
        {cities
          ? cities.data.map((city, index) => (
              <button
                key={index}
                className="search-result flex w-full items-center justify-between border-2 border-transparent py-4 pl-4 pr-2 hover:border-[var(--medium-grey)] focus:border-[var(--medium-grey)]"
                onClick={(): void => {
                  setCoords({
                    latitude: city.latitude,
                    longitude: city.longitude,
                  });
                  setAuto(false);
                  showSearch(false);
                }}
              >
                <p className="">{city.city}</p>
                <MdOutlineKeyboardArrowRight className="arrow text-2xl" />
              </button>
            ))
          : null}
      </div>
    </div>
  );
}
