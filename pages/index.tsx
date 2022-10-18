import Head from "next/head";
import CurrentWeather from "../components/currentWeather";
import Forecast from "../components/forecast";
import Highlights from "../components/highlights";
import MoreInfo from "../components/moreInfo";

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Weather App</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <main className="">
        <CurrentWeather />
        <MoreInfo>
          <Forecast />
          <Highlights />
        </MoreInfo>
      </main>
    </>
  );
}
