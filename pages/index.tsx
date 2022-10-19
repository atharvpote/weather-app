import { GetServerSideProps } from "next";
import Head from "next/head";
import { format } from "date-fns";
import CurrentWeather from "../components/currentWeather";
import Forecast from "../components/forecast";
import Highlights from "../components/highlights";
import MoreInfo from "../components/moreInfo";
import Units from "../components/units";

type OWCurrWeatherRes = {
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
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain: {
    "3h": number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
};

type OWWeatherForecastRes = {
  cod: string;
  message: number;
  cnt: number;
  list: DailyForecast[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
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

  const resIpWhoIs = await fetch(`http://ipwho.is/${ip}`);
  const { latitude, longitude } = (await resIpWhoIs.json()) as {
    latitude: number;
    longitude: number;
  };

  const resOWCurrWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
      process.env.OW_KEY as string
    }&units=metric`
  );
  const weather = (await resOWCurrWeather.json()) as OWCurrWeatherRes;

  const resOWWeatherForecast = await fetch(
    `https://api.openweathermap.org/data/2.5/daily?lat=${latitude}&lon=${longitude}&appid=${
      process.env.OW_KEY as string
    }&units=metric`
  );
  const forecast = (await resOWWeatherForecast.json()) as OWWeatherForecastRes;

  return {
    props: {
      weather,
      forecast,
      date: format(new Date(), "EEE. d MMM"),
    },
  };
};

type Props = {
  weather: OWCurrWeatherRes;
  forecast: OWWeatherForecastRes;
  date: string;
};

export default function Home({ weather, forecast, date }: Props): JSX.Element {
  console.log(forecast);

  return (
    <>
      <Head>
        <title>Weather App</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <main className="grid min-h-screen place-items-center bg-slate-900 md:px-8">
        <div className="w-full max-w-[1440px] shadow-2xl md:my-8 md:flex md:overflow-hidden md:rounded-md">
          <CurrentWeather
            city={weather.name}
            weather={weather.weather[0].main}
            temp={weather.main.temp}
            date={date}
          />
          <MoreInfo>
            <Units />
            {/* <Forecast forecasts={forecast.list} /> */}
            <Highlights
              windSpeed={weather.wind.speed}
              humidity={weather.main.humidity}
              visibility={weather.visibility}
              pressure={weather.main.pressure}
            />
          </MoreInfo>
        </div>
      </main>
    </>
  );
}
