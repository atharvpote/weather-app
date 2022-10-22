import Head from "next/head";
import { useEffect, useState } from "react";
import CurrentWeather from "../components/currentWeather";
import Forecast from "../components/forecast";
import Highlights from "../components/highlights";
import MoreInfo from "../components/moreInfo";
import Units from "../components/units";

export default function Home(): JSX.Element {
  const [location, setLocation] = useState<Location | Loading>({
    loading: true,
  });
  const [weather, setWeather] = useState<WeatherLoaded | Loading>({
    loading: true,
  });

  useEffect(() => {
    fetch("https://ipwho.is/")
      .then((res) => res.json())
      .then((data: Location | { success: false }) => {
        if (data.success)
          setLocation({
            loading: false,
            success: true,
            latitude: data.latitude,
            longitude: data.longitude,
          });
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (!location.loading)
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          location.latitude
        }&lon=${location.longitude}&appid=${
          process.env.NEXT_PUBLIC_OWM_KEY as string
        }&units=metric`
      )
        .then((res) => res.json())
        .then((data: Weather | { cod: "400" }) => {
          if (data.cod !== "400") setWeather({ loading: false, data });
        })
        .catch((error) => console.error(error));
  }, [location]);

  return (
    <>
      <Head>
        <title>Weather App</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <main className="grid min-h-screen place-items-center bg-slate-900 md:px-8">
        <div className="w-full max-w-[1440px] shadow-2xl md:my-8 md:flex md:overflow-hidden md:rounded-md">
          <>
            <CurrentWeather weather={weather} />
            <MoreInfo>
              <Units />
              <Forecast />
              <Highlights weather={weather} />
            </MoreInfo>
          </>
        </div>
      </main>
    </>
  );
}

export type WeatherLoaded = {
  loading: false;
  data: Weather;
};

type Weather = {
  weather: [
    {
      main: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
  cod: "200";
};

type Location = {
  loading: false;
  success: true;
  latitude: number;
  longitude: number;
};

export type Loading = { loading: true };
