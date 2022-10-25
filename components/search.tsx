import { Dispatch, useState, useRef, MutableRefObject } from "react";
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
  const search = useRef<HTMLInputElement | null>(null);

  if (search.current) search.current.focus();

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
            ref={search}
          />
        </form>
      </div>
      <div>
        {cities
          ? showResult(cities.data, setCoords, setAuto, showSearch, search)
          : null}
      </div>
    </div>
  );
}

function showResult(
  cities: City[],
  setCoords: Dispatch<Coords>,
  setAuto: Dispatch<boolean>,
  showSearch: Dispatch<boolean>,
  search: MutableRefObject<HTMLInputElement | null>
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
        setAuto(false);
        showSearch(false);
        search.current?.blur();
      }}
    >
      <p className="">{city.city}</p>
      <MdOutlineKeyboardArrowRight className="arrow text-2xl" />
    </button>
  ));
}
