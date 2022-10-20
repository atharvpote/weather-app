import { GetServerSideProps } from "next";
import Head from "next/head";
import getCoordinates from "../utils/getCoordinates";
import CurrentWeather from "../components/currentWeather";
import Forecast from "../components/forecast";
import Highlights from "../components/highlights";
import MoreInfo from "../components/moreInfo";
import Units from "../components/units";
import { useState } from "react";
import {
  getForecastData,
  getWeatherData,
} from "../utils/getWeatherAndForecastData";

type Props =
  | {
      success: true;
      latitude: number;
      longitude: number;
    }
  | { success: false; error: { message: string } };

export default function Home(props: Props): JSX.Element {
  console.log(props);

  if (props.success) {
    const weather = getWeatherData(props.latitude, props.longitude);
    const forecast = getForecastData(props.latitude, props.longitude);

    console.log(weather);
    console.log(forecast);
  }

  return (
    <>
      <Head>
        <title>Weather App</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <main className="grid min-h-screen place-items-center bg-slate-900 md:px-8">
        <div className="w-full max-w-[1440px] shadow-2xl md:my-8 md:flex md:overflow-hidden md:rounded-md">
          <>
            <CurrentWeather />
            <MoreInfo>
              <Units />
              <Forecast />
              <Highlights />
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

  return {
    props: {
      success: true,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    },
  };
};
