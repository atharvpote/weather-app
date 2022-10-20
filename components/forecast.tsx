import Image, { StaticImageData } from "next/image";
import { format } from "date-fns";
import type {
  DailyForecastData,
  WeatherForecastData,
} from "../utils/getWeatherData";
import transparent from "../public/Transparent.png";

type Props = {
  forecastData: WeatherForecastData | null;

  getIcon: (icon: string, desc: string) => StaticImageData;
};

export default function Forecast({
  forecastData,
  getIcon,
}: Props): JSX.Element {
  console.log(forecastData);

  const list = forecastData?.list;

  if (list) extractForecastData(list);

  return (
    <div className=" mx-6 flex flex-wrap justify-center gap-6 pt-8 pb-16">
      {new Array(4).fill(1).map((_, index) => {
        return (
          <article
            key={index}
            className="medium-dark-background basis-32 px-4 py-4 font-medium shadow-lg"
          >
            <h3 className="text-center">Date</h3>
            <div className="mx-auto mb-6 mt-2 w-14">
              {!forecastData ? (
                <Image src={transparent} alt="" />
              ) : (
                <Image src={getIcon("", "")} alt="" layout="responsive" />
              )}
            </div>
            <div className="flex justify-between">
              <span>Max&#176;C</span>
              <span className="grey-text">Min&#176;C</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function extractForecastData(list: DailyForecastData[]): void {
  type WeatherData = {
    date: string;
    minTemp: number;
    maxTemp: number;
    weatherId: number;
  };

  console.log(list);

  const dates = new Map<string, WeatherData[]>();

  list?.forEach((data) => {
    if (!dates.has(data.dt_txt.split(" ")[0].split("-")[2]))
      dates.set(data.dt_txt.split(" ")[0].split("-")[2], []);

    dates.get(data.dt_txt.split(" ")[0].split("-")[2])?.push({
      date: data.dt_txt,
      minTemp: data.main.temp_min,
      maxTemp: data.main.temp_max,
      weatherId: data.weather[0].id,
    });
  });

  const aggregatedData: {
    [key: string]: {
      minTemp: number | null;
      maxTemp: number | null;
      weatherIdCounter: Map<number, number>;
    };
  } = {};

  for (const arr of Array.from(dates.entries())) {
    const date = arr[0];
    const weatherData = arr[1];
    const weatherIdCounter = new Map<number, number>();

    let minTemp: number | null = null;
    let maxTemp: number | null = null;

    for (const values of weatherData) {
      if (!minTemp) minTemp = values.minTemp;
      else if (minTemp > values.minTemp) minTemp = values.minTemp;

      if (!maxTemp) maxTemp = values.maxTemp;
      else if (maxTemp > values.maxTemp) maxTemp = values.maxTemp;

      const weatherCount = weatherIdCounter.get(values.weatherId);
      if (!weatherCount) weatherIdCounter.set(values.weatherId, 1);
      else weatherIdCounter.set(values.weatherId, weatherCount + 1);
    }

    aggregatedData[date] = {
      minTemp,
      maxTemp,
      weatherIdCounter,
    };
  }

  console.log(aggregatedData);
}
