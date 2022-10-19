import { GetServerSideProps } from "next";
import Head from "next/head";
import { format } from "date-fns";
import CurrentWeather from "../components/currentWeather";
import Forecast from "../components/forecast";
import Highlights from "../components/highlights";
import MoreInfo from "../components/moreInfo";
import Units from "../components/units";

type OWCurrWeatherRes = {
  message: number | string;
  weather: [
    {
      main: string;
    }
  ];
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
};

export type DailyForecast = {
  main: {
    temp_min: number;
    temp_max: number;
  };
  dt_txt: string;
};

type OWWeatherForecastRes = {
  list: DailyForecast[];
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let ip: string;

  if (
    req.headers["x-forwarded-for"] &&
    typeof req.headers["x-forwarded-for"] === "string"
  ) {
    ip = req.headers["x-forwarded-for"].split(",")[0];
  } else {
    ip = req.connection.remoteAddress as string;
  }

  const reqIpWhoIs = await fetch(`http://ipwho.is/${ip}`);

  const resIpWhoIs = (await reqIpWhoIs.json()) as {
    success: boolean;
    latitude: number;
    longitude: number;
  };

  if (resIpWhoIs.success) {
    const latitude = resIpWhoIs.latitude;
    const longitude = resIpWhoIs.longitude;

    const resOWCurrWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
        process.env.OW_KEY as string
      }&units=metric`
    );
    const weather = (await resOWCurrWeather.json()) as OWCurrWeatherRes;

    const resOWWeatherForecast = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${
        process.env.OW_KEY as string
      }&units=metric`
    );
    const forecast =
      (await resOWWeatherForecast.json()) as OWWeatherForecastRes;

    return {
      props: {
        weather,
        forecast,
        date: format(new Date(), "EEE. d MMM"),
      },
    };
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
              />
              <MoreInfo>
                <Units />
                <Forecast forecasts={forecast.list} />
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
