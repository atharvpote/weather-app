import { GetServerSideProps } from "next";
import Head from "next/head";
import CurrentWeather from "../components/currentWeather";
import Forecast from "../components/forecast";
import Highlights from "../components/highlights";
import MoreInfo from "../components/moreInfo";

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let ip: string | undefined;

  if (
    req.headers["x-forwarded-for"] &&
    typeof req.headers["x-forwarded-for"] === "string"
  ) {
    ip = req.headers["x-forwarded-for"].split(",")[0];
  } else if (req.headers["x-real-ip"]) {
    if (req.connection.remoteAddress) ip = req.connection.remoteAddress;
  } else {
    ip = req.connection.remoteAddress;
  }

  return {
    props: {
      ip,
    },
  };
};

export default function Home({ ip }: { ip: string | undefined }): JSX.Element {
  console.log(ip);

  return (
    <>
      <Head>
        <title>Weather App</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <main className="grid min-h-screen content-center bg-slate-900">
        <div className="mx-auto w-full max-w-[1440px] md:flex xl:max-h-[1024px] xl:overflow-hidden xl:rounded-md">
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
