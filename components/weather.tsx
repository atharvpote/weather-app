import Image from "next/image";
import { Dispatch, useState } from "react";
import { format } from "date-fns";
import { MdLocationOn, MdGpsFixed } from "react-icons/md";
import useLocation from "../utils/useLocation";
import useWeather, { Coords } from "../utils/useWeather";
import Search from "./search";
import toFahrenheit from "../utils/toFahrenheit";

type Props = {
  deviceLocationByIp: boolean;
  setDeviceLocationIp: Dispatch<boolean>;
  coords: Coords;
  setCoords: Dispatch<Coords>;
  useImperial: boolean;
};

export default function Weather({
  deviceLocationByIp,
  setDeviceLocationIp,
  coords,
  setCoords,
  useImperial,
}: Props): JSX.Element {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const location = useLocation();
  const weather = useWeather(
    deviceLocationByIp
      ? {
          latitude: location?.latitude,
          longitude: location?.longitude,
        }
      : coords
  );

  return (
    <section className="medium-dark-background relative grid min-h-screen shadow-lg md:min-h-full md:max-w-[460px] md:basis-[45rem]">
      <Search
        status={showSearch}
        showSearch={setShowSearch}
        setDeviceLocationIp={setDeviceLocationIp}
        setCoords={setCoords}
      />
      <div className="pt-6 pb-24">
        <div className="flex items-center justify-between px-4">
          <button
            className="light-grey-background py-2 px-4 font-medium text-white shadow-md shadow-gray-900"
            aria-label="Search for places."
            onClick={(): void => setShowSearch(true)}
          >
            Search for places
          </button>
          <button
            className={`inline-block rounded-full p-2 shadow-md shadow-gray-900 transition-all ${
              !deviceLocationByIp
                ? "white-background medium-grey-text"
                : "light-grey-background"
            }`}
            aria-label="Weather report for your location."
            onClick={(): void => {
              navigator.geolocation.getCurrentPosition(
                (res) => {
                  setCoords({
                    latitude: res.coords.latitude,
                    longitude: res.coords.longitude,
                  });
                  setDeviceLocationIp(false);
                },
                () => {
                  setCoords({ latitude: undefined, longitude: undefined });
                  setDeviceLocationIp(true);
                }
              );
            }}
          >
            <MdGpsFixed className="text-2xl" />
          </button>
        </div>
        <div className="relative mx-auto grid h-80 max-w-[588px] place-content-center after:absolute after:top-0 after:h-full after:w-full after:bg-[url('../public/Cloud-background.png')] after:bg-cover after:bg-center after:opacity-10">
          <div className="mx-auto">
            {weather ? (
              <Image
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt=""
                width={200}
                height={200}
                className="opacity-100"
              />
            ) : (
              <div className="h-[200] w-[200]"></div>
            )}
          </div>
        </div>
        <div className="text-center">
          {weather && useImperial ? (
            <h1 className="mb-6 text-9xl font-medium">
              {Math.round(toFahrenheit(weather.main.temp))}
              <span className="grey-text text-5xl font-semibold">&#176;F</span>
            </h1>
          ) : weather ? (
            <h1 className="mb-6 text-9xl font-medium">
              {Math.round(weather.main.temp)}
              <span className="grey-text text-5xl font-semibold">&#176;C</span>
            </h1>
          ) : null}
          <div className="grey-text">
            <h2 className=" mb-10 text-4xl font-semibold">
              {weather ? weather.weather[0].main : null}
            </h2>
            <div className="text-lg">
              <div className="mb-8 flex items-center justify-center gap-4 font-medium">
                <span>Today</span>
                <span className="grey-background inline-block h-1 w-1 rounded-full"></span>
                <span>{weather ? format(new Date(), "EEE. d MMM") : null}</span>
              </div>
              <h2 className="flex items-center justify-center gap-1 font-semibold">
                <MdLocationOn className="text-2xl" />{" "}
                {weather ? weather.name : null}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
