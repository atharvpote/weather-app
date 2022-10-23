import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import CurrentWeather from "../components/currentWeather";
import Forecast from "../components/forecast";
import Highlights from "../components/highlights";
import MoreInfo from "../components/moreInfo";
import Units from "../components/units";
import useWeather, { Coords } from "../utils/useWeather";
import useLocation from "../utils/useLocation";
import puff from "../public/puff.svg";

export default function Home(): JSX.Element {
  const [auto, setAuto] = useState<boolean>(true);
  const [coords, setCoords] = useState<Coords>(undefined);
  const location = useLocation();
  const weather = useWeather(
    auto
      ? {
          latitude: location?.latitude,
          longitude: location?.longitude,
        }
      : coords
  );

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
        />
      </Head>
      <main className="grid min-h-screen place-items-center bg-slate-900 md:px-8">
        {weather ? (
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
                <Forecast auto={auto} coords={coords} />
                <Highlights auto={auto} coords={coords} />
              </MoreInfo>
            </>
          </div>
        ) : (
          <div className="w-[200px]">
            <Image
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              src={puff}
              alt=""
              layout="fixed"
              width={200}
              height={200}
              priority={true}
            />
          </div>
        )}
      </main>
    </>
  );
}
