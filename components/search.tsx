import { Dispatch, useState } from "react";
import {
  MdClose,
  MdOutlineSearch,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import useDebounce from "../utils/useDebounce";
import useCityData from "../utils/useCityData";
import { Coords } from "../utils/useWeather";
import { City } from "../utils/useCityData";

type Props = {
  status: boolean;
  showSearch: Dispatch<boolean>;
  setDeviceLocationIp: Dispatch<boolean>;
  setCoords: Dispatch<Coords>;
  setSearchMode: Dispatch<boolean>;
};

export default function Search({
  status,
  showSearch,
  setDeviceLocationIp,
  setCoords,
  setSearchMode,
}: Props): JSX.Element {
  const [query, setQuery] = useState<string>("");
  const debounceQuery = useDebounce(query, 500);
  const cities = useCityData(debounceQuery);

  return (
    <div
      className={`medium-dark-background fixed top-0 left-0 z-20 min-h-screen w-full bg-black p-4 opacity-100 transition-all md:absolute ${
        status ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="mb-8 flex justify-end">
        <button onClick={(): void => showSearch(false)}>
          <MdClose className="text-2xl" />
        </button>
      </div>
      <div className="mb-8 flex h-12 gap-4">
        <form
          className="flex basis-full items-stretch border-2 border-[var(--grey)]"
          onSubmit={(e): void => e.preventDefault()}
        >
          <label htmlFor="search" className="flex items-center px-3">
            <MdOutlineSearch className="fill-[var(--grey)] text-2xl opacity-50" />
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search location"
            className="w-full bg-transparent placeholder:text-[var(--grey)] placeholder:opacity-50 focus:outline-none"
            onChange={(e): void => setQuery(e.target.value)}
          />
        </form>
      </div>
      <div>
        {cities
          ? showResult(
              cities.data,
              setCoords,
              setDeviceLocationIp,
              showSearch,
              setSearchMode
            )
          : null}
      </div>
    </div>
  );
}

function showResult(
  cities: City[],
  setCoords: Dispatch<Coords>,
  setDeviceLocationIp: Dispatch<boolean>,
  showSearch: Dispatch<boolean>,
  setSearchMode: Dispatch<boolean>
): JSX.Element | JSX.Element[] {
  if (!cities.length) return <p className="text-center">No Match</p>;

  return cities.map((city, index) => (
    <button
      type="submit"
      key={index}
      className="search-result flex w-full items-center justify-between border-2 border-transparent py-4 pl-4 pr-2 hover:border-[var(--medium-grey)] focus:border-[var(--medium-grey)]"
      onClick={(): void => {
        setCoords({
          latitude: city.latitude,
          longitude: city.longitude,
        });
        setDeviceLocationIp(false);
        showSearch(false);
        setSearchMode(true);

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: window.innerWidth < 768 ? "auto" : "smooth",
        });
      }}
    >
      <p className="text-left">{city.city.trim()}</p>
      <MdOutlineKeyboardArrowRight className="arrow text-2xl" />
    </button>
  ));
}
