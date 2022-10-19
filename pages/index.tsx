import { GetServerSideProps } from "next";
import Head from "next/head";
import CurrentWeather from "../components/currentWeather";
import Forecast from "../components/forecast";
import Highlights from "../components/highlights";
import MoreInfo from "../components/moreInfo";
import Units from "../components/units";

type OWRes = {
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
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

  const resOW = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
      process.env.OW_KEY as string
    }`
  );
  const weather = (await resOW.json()) as OWRes;

  return {
    props: {
      weather,
    },
  };
};

export default function Home({ weather }: { weather: OWRes }): JSX.Element {
  console.log(weather);

  return (
    <>
      <Head>
        <title>Weather App</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <main className="grid min-h-screen place-items-center bg-slate-900 md:px-8">
        <div className="w-full max-w-[1440px] shadow-2xl md:my-8 md:flex md:overflow-hidden md:rounded-md">
          <CurrentWeather />
          <MoreInfo>
            <Units />
            <Forecast />
            <Highlights />
          </MoreInfo>
        </div>
      </main>
    </>
  );
}
