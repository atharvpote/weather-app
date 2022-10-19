import Image, { StaticImageData } from "next/image";
import { format } from "date-fns";
import type { DailyForecast } from "../utils/getWeatherData";

type Props = {
  forecasts: DailyForecast[];

  getIcon: (icon: string, desc: string) => StaticImageData;
};

export default function Forecast({ forecasts, getIcon }: Props): JSX.Element {
  for (let i = 0; i < forecasts.length; i++) {
    if (
      forecasts[i].dt_txt.split("-")[2].split(" ")[0] ===
        format(new Date(), "dd") ||
      forecasts[i].dt_txt.split("-")[2].split(" ")[0] ===
        (Number.parseInt(format(new Date(), "dd")) + 5).toString()
    ) {
      forecasts.splice(i, 1);

      i--;
    }
  }

  const filtered = (forecasts = forecasts.filter(
    (data) =>
      data.dt_txt.split(" ")[1] === "06:00:00" ||
      data.dt_txt.split(" ")[1] === "15:00:00"
  ));

  const mapped: DailyForecast[][] = [];

  for (let i = 0; i < filtered.length; i += 2) {
    const tuple = [filtered[i], filtered[i + 1]];

    mapped.push(tuple);
  }

  return (
    <div className=" mx-6 flex flex-wrap justify-center gap-6 pt-8 pb-16">
      {mapped.map((data, index) => {
        const year = Number.parseInt(data[0].dt_txt.split("-")[0]);
        const month = Number.parseInt(data[0].dt_txt.split("-")[1]);
        const day = Number.parseInt(data[0].dt_txt.split("-")[2].split(" ")[0]);

        return (
          <article
            key={index}
            className="medium-dark-background basis-32 px-4 py-4 font-medium shadow-lg"
          >
            <h3 className="text-center">
              {format(new Date(year, month, day), "EEE. d MMM")}
            </h3>
            <div className="mx-auto mb-6 mt-2 w-14">
              <Image
                src={getIcon(
                  data[0].weather[0].main,
                  data[0].weather[0].description
                )}
                alt=""
                layout="responsive"
              />
            </div>
            <div className="flex justify-between">
              <span>{Math.floor(data[0].main.temp_max)}&#176;C</span>
              <span className="grey-text">
                {Math.floor(data[1].main.temp_min)}&#176;C
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
