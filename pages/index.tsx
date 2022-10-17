import Head from "next/head";

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Weather App</title>
      </Head>
      <main>
        <h1 className="text-3xl text-center font-bold">Weather App</h1>
      </main>
    </>
  );
}
