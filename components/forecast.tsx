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
