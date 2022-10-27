import Head from "next/head";
import { useState } from "react";
import Weather from "../components/weather";
import Forecast from "../components/forecast";
import Highlights from "../components/highlights";
import MoreInfo from "../components/moreInfo";
import UnitSystemToggle from "../components/unitSystemToggle";
import { Coords } from "../utils/useWeather";
import useLocation from "../utils/useLocation";
import useWeather from "../utils/useWeather";
import toFahrenheit from "../utils/toFahrenheit";

export default function Home(): JSX.Element {
  const [deviceLocationByIp, setDeviceLocationIp] = useState<boolean>(true);
  const [coords, setCoords] = useState<Coords>(undefined);
  const [useImperial, setUseImperial] = useState<boolean>(false);
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
    <>
      <Head>
        <title>
          {weather
            ? `${
                useImperial
                  ? `${Math.round(toFahrenheit(weather.main.temp))}F`
                  : `${Math.round(weather.main.temp)}C`
              } ${weather.name}`
            : `Weather App`}
        </title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <link
          rel="preload"
          href="https://ipwho.is/"
          as="fetch"
          crossOrigin="anonymous"
        />
        <meta name="description" content="A simple and beautiful weather app" />
      </Head>
      <main className="grid min-h-screen place-items-center bg-slate-900 md:px-8">
        <div className="w-full max-w-[1440px] shadow-2xl md:my-8 md:flex md:overflow-hidden md:rounded-md">
          <>
            <Weather
              deviceLocationByIp={deviceLocationByIp}
              setDeviceLocationIp={setDeviceLocationIp}
              coords={coords}
              setCoords={setCoords}
              useImperial={useImperial}
            />
            <MoreInfo>
              <UnitSystemToggle
                useImperial={useImperial}
                setUseImperial={setUseImperial}
              />
              <Forecast
                deviceLocationByIp={deviceLocationByIp}
                coords={coords}
                useImperial={useImperial}
              />
              <Highlights
                deviceLocationByIp={deviceLocationByIp}
                coords={coords}
                useImperial={useImperial}
              />
            </MoreInfo>
          </>
        </div>
      </main>
    </>
  );
}
