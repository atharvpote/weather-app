import { GetServerSideProps } from "next";
import Head from "next/head";
import CurrentWeather from "../components/currentWeather";
import Forecast from "../components/forecast";
import Highlights from "../components/highlights";
import MoreInfo from "../components/moreInfo";
import Units from "../components/units";

export default function Home(): JSX.Element {
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

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
