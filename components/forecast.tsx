import Image from "next/image";
import { format } from "date-fns";
import type { ForecastData } from "../utils/getWeatherAndForecastData";
import extractForecastData, {
  ExtractedForecastData,
} from "../utils/extractForecastData";
import transparent from "../public/Transparent.png";
import getIcon from "../utils/getIcon";

export default function Forecast({ forecastData }: Props): JSX.Element {
  let forecast: ExtractedForecastData = {};
  if (forecastData?.list) forecast = extractForecastData(forecastData?.list);

  console.log(forecast);
  return (
    <div className=" mx-6 flex flex-wrap justify-center gap-6 pt-8 pb-16">
      {/* {cards(forecast)} */}
    </div>
  );
}

function cards(forecast: ExtractedForecastData): JSX.Element[] {
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
              src={getIcon(forecast[key].weatherId)}
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

type Props = {
  forecastData: ForecastData | null;
};
