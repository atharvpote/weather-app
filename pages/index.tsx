import { GetServerSideProps } from "next";
import Head from "next/head";
import { format } from "date-fns";
import getCoordinates from "../utils/getCoordinates";
import getWeatherData from "../utils/getWeatherData";
import getIcon from "../utils/getIcon";
import type {
  OWCurrWeatherRes,
  OWWeatherForecastRes,
} from "../utils/getWeatherData";
import CurrentWeather from "../components/currentWeather";
import Forecast from "../components/forecast";
import Highlights from "../components/highlights";
import MoreInfo from "../components/moreInfo";
import Units from "../components/units";

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

  if (ip) {
    const { success, latitude, longitude } = await getCoordinates(ip);
    const { weather, forecast } = await getWeatherData(latitude, longitude);

    if (success) {
      return {
        props: {
          weather,
          forecast,
          date: format(new Date(), "EEE. d MMM"),
        },
      };
    }
  }

  return {
    props: {
      error: true,
    },
  };
};

type Props = {
  weather: OWCurrWeatherRes;
  forecast: OWWeatherForecastRes;
  date: string;
  error?: true;
};

export default function Home({
  weather,
  forecast,
  date,
  error,
}: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>Weather App</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <main className="grid min-h-screen place-items-center bg-slate-900 md:px-8">
        <div className="w-full max-w-[1440px] shadow-2xl md:my-8 md:flex md:overflow-hidden md:rounded-md">
          {error ? (
            <div className="md:basis-full">
              <p className="text-center">
                Something went wrong, please try again later
              </p>
            </div>
          ) : (
            <>
              <CurrentWeather
                city={weather.name}
                weather={weather.weather[0].main}
                temp={weather.main.temp}
                date={date}
                icon={weather.weather[0].main}
                desc={weather.weather[0].description}
                getIcon={getIcon}
              />
              <MoreInfo>
                <Units />
                <Forecast forecasts={forecast.list} getIcon={getIcon} />
                <Highlights
                  windSpeed={weather.wind.speed}
                  humidity={weather.main.humidity}
                  visibility={weather.visibility}
                  pressure={weather.main.pressure}
                />
              </MoreInfo>
            </>
          )}
        </div>
      </main>
    </>
  );
}
