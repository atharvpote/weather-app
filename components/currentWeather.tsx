import Image from "next/image";
import { format } from "date-fns";
import { MdLocationOn, MdGpsFixed } from "react-icons/md";
import { WeatherData } from "../utils/getWeatherAndForecastData";
import transparent from "../public/Transparent.png";

type Props = {
  weatherData: WeatherData | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  iconProvider: (weatherId: number) => any;
};

export default function CurrentWeather({
  weatherData,
  iconProvider: getIcon,
}: Props): JSX.Element {
  return (
    <section className="medium-dark-background grid min-h-screen shadow-lg md:min-h-full md:max-w-[460px] md:basis-[45rem]">
      <div className="pt-6 pb-24">
        <div className="flex items-center justify-between px-4">
          <button
            className="light-grey-background py-2 px-4 font-medium text-white shadow-md shadow-gray-900"
            aria-label="Search for places."
          >
            Search for places
          </button>
          <button
            className="light-grey-background inline-block rounded-full p-2 shadow-md shadow-gray-900"
            aria-label="Weather report for your location."
          >
            <MdGpsFixed className="text-2xl" />
          </button>
        </div>
        <div className="relative mx-auto grid h-80 max-w-[588px] place-content-center after:absolute after:top-0 after:h-full after:w-full after:bg-[url('../public/Cloud-background.png')] after:bg-cover after:bg-center after:opacity-10">
          <div className="mx-auto w-36">
            {!weatherData ? (
              <Image
                src={transparent}
                alt=""
                layout="responsive"
                className="opacity-100"
              />
            ) : (
              <Image
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                src={getIcon(weatherData.weather[0].id)}
                alt=""
                layout="responsive"
                className="opacity-100"
              />
            )}
          </div>
        </div>
        <div className="text-center">
          <h1 className="mb-6 text-9xl font-medium">
            {!weatherData ? "" : Math.floor(weatherData.main.temp)}
            <span className="grey-text text-5xl font-semibold">&#176;C</span>
          </h1>
          <div className="grey-text">
            <h2 className=" mb-10 text-4xl font-semibold">
              {!weatherData ? "" : weatherData.weather[0].main}
            </h2>
            <div className="text-lg">
              <div className="mb-8 flex items-center justify-center gap-4 font-medium">
                <span>Today</span>
                <span className="grey-background inline-block h-1 w-1 rounded-full"></span>
                <span>{format(new Date(), "EEE. d MMM")}</span>
              </div>
              <h2 className="flex items-center justify-center gap-1 font-semibold">
                <MdLocationOn className="text-2xl" />{" "}
                {!weatherData ? "" : weatherData.name}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
