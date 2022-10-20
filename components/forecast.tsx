import Image from "next/image";
import { format } from "date-fns";
import type { WeatherForecastData } from "../utils/getWeatherData";
import extractForecastData, {
  ForecastData,
} from "../utils/extractForecastData";
import transparent from "../public/Transparent.png";
import getIcon from "../utils/getIcon";

type Props = {
  forecastData: WeatherForecastData | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  iconProvider: (weatherId: number) => any;
};

export default function Forecast({
  forecastData,
  iconProvider,
}: Props): JSX.Element {
  let forecast: ForecastData = {};
  if (forecastData?.list) forecast = extractForecastData(forecastData?.list);

  console.log(forecast);
  iconProvider;
  return (
    <div className=" mx-6 flex flex-wrap justify-center gap-6 pt-8 pb-16">
      {cards(forecast, iconProvider)}
    </div>
  );
}

function cards(
  forecast: ForecastData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  iconProvider: (weatherId: number) => any
): JSX.Element[] {
  const cards: JSX.Element[] = [];

  for (const key in forecast) {
    cards.push(
      <article
        key={key}
        className="medium-dark-background basis-32 px-4 py-4 font-medium shadow-lg"
      >
        <h3 className="text-center">Date</h3>
        <div className="mx-auto my-4 w-14">
          {
            <Image
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              src={iconProvider(forecast[key].weatherId)}
              alt=""
              layout="responsive"
            />
          }
        </div>
        <div className="flex justify-between">
          <span>{Math.floor(forecast[key].maxTemp)}&#176;C</span>
          <span className="grey-text">
            {Math.floor(forecast[key].minTemp)}&#176;C
          </span>
        </div>
      </article>
    );
  }

  return cards;
}
