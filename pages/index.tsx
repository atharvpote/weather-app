import { GetServerSideProps } from "next";
import Head from "next/head";
import CurrentWeather from "../components/currentWeather";
import Forecast from "../components/forecast";
import Highlights from "../components/highlights";
import MoreInfo from "../components/moreInfo";

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

  const res = await fetch(`http://ipwho.is/${ip}`);
  const location = (await res.json()) as JSON;

  return {
    props: {
      location,
    },
  };
};

export default function Home({ location }: { location: JSON }): JSX.Element {
  console.log(location);

  return (
    <>
      <Head>
        <title>Weather App</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <main className="grid min-h-screen place-items-center bg-slate-900 md:px-8">
        <div className="w-full max-w-[1440px] shadow-2xl md:my-8 md:flex xl:overflow-hidden xl:rounded-md">
          <CurrentWeather />
          <MoreInfo>
            <Forecast />
            <Highlights />
          </MoreInfo>
        </div>
      </main>
    </>
  );
}
