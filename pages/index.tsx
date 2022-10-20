import { GetServerSideProps } from "next";
import Head from "next/head";
import getCoordinates from "../utils/getCoordinates";
import getWeatherData from "../utils/getWeatherData";
import type {
  CurrentWeatherData,
  WeatherForecastData,
} from "../utils/getWeatherData";
import CurrentWeather from "../components/currentWeather";
import Forecast from "../components/forecast";
import Highlights from "../components/highlights";
import MoreInfo from "../components/moreInfo";
import Units from "../components/units";
import { useState } from "react";

type Props =
  | {
      success: true;
      weather: CurrentWeatherData;
      forecast: WeatherForecastData;
    }
  | { success: false; error: { message: string } };

export default function Home(props: Props): JSX.Element {
  const [weather, setWeather] = useState<CurrentWeatherData | null>(
    props.success ? props.weather : null
  );
  const [forecast, setForecast] = useState<WeatherForecastData | null>(
    props.success ? props.forecast : null
  );

  return (
    <>
      <Head>
        <title>Weather App</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <main className="grid min-h-screen place-items-center bg-slate-900 md:px-8">
        <div className="w-full max-w-[1440px] shadow-2xl md:my-8 md:flex md:overflow-hidden md:rounded-md">
          <>
            <CurrentWeather weatherData={weather} />
            <MoreInfo>
              <Units />
              <Forecast forecastData={forecast} />
              <Highlights weatherData={weather} />
            </MoreInfo>
          </>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let ip: string | undefined;

  if (
    req.headers["x-forwarded-for"] &&
    typeof req.headers["x-forwarded-for"] === "string"
  ) {
    ip = req.headers["x-forwarded-for"].split(",")[0];
  } else {
    ip = req.connection.remoteAddress;
  }

  if (!ip)
    return {
      props: {
        error: { message: "Could not resolve IP Address" },
      },
    };

  const locationData = await getCoordinates(ip);

  if (!locationData.success)
    return {
      props: {
        error: { message: locationData.message },
      },
    };

  const { latitude, longitude } = locationData;
  const weatherData = await getWeatherData(latitude, longitude);

  if (!weatherData.success)
    return {
      props: {
        success: false,
        error: weatherData.error,
      },
    };

  const { weather, forecast } = weatherData;

  return {
    props: {
      success: true,
      weather,
      forecast,
    },
  };
};
