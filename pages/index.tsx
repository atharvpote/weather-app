import Head from "next/head";
import CurrentWeather from "../components/currentWeather";

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Weather App</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <main>
        <CurrentWeather />
      </main>
    </>
  );
}
