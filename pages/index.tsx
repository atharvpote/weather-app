import Head from "next/head";
import { useState } from "react";
import CurrentWeather from "../components/currentWeather";
import Forecast from "../components/forecast";
import Highlights from "../components/highlights";
import MoreInfo from "../components/moreInfo";
import Units from "../components/units";
import { Coords } from "../utils/useWeather";

export default function Home(): JSX.Element {
  const [auto, setAuto] = useState<boolean>(true);
  const [coords, setCoords] = useState<Coords>(undefined);

  return (
    <>
      <Head>
        <title>Weather App</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <link
          rel="preload"
          href="https://ipwho.is/"
          as="fetch"
          crossOrigin="anonymous"
        ></link>
      </Head>
      <main className="grid min-h-screen place-items-center bg-slate-900 md:px-8">
        <div className="w-full max-w-[1440px] shadow-2xl md:my-8 md:flex md:overflow-hidden md:rounded-md">
          <>
            <CurrentWeather
              auto={auto}
              setAuto={setAuto}
              coords={coords}
              setCoords={setCoords}
            />
            <MoreInfo>
              <Units />
              <Forecast />
              <Highlights auto={auto} coords={coords} />
            </MoreInfo>
          </>
        </div>
      </main>
    </>
  );
}
