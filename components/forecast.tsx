import Image from "next/image";
import { format } from "date-fns";
import type { DailyForecast } from "../pages/index";
import heavyRain from "../public/HeavyRain.png";

type Props = {
  forecasts: DailyForecast[];
};

export default function Forecast({ forecasts }: Props): JSX.Element {
  const filtered = forecasts.filter((data) => {
    const day = Number.parseInt(data.dt_txt.split("-")[2].split(" ")[0]);

    format(day, "dd") !== format(new Date(), "dd");
  });

  console.log(filtered);

  return (
    <div className=" mx-6 flex flex-wrap justify-center gap-6 pt-8 pb-16">
      {filtered.map((data, index) => {
        console.log(data.dt, data.dt_txt);

        const year = Number.parseInt(data.dt_txt.split("-")[0]);
        const month = Number.parseInt(data.dt_txt.split("-")[1]);
        const day = Number.parseInt(data.dt_txt.split("-")[2].split(" ")[0]);

        return (
          <article
            key={index}
            className="medium-dark-background basis-32 px-4 py-4 font-medium shadow-lg"
          >
            <h3 className="text-center">
              {index == 0
                ? "Tomorrow"
                : format(new Date(year, month, day), "EEE. d MMM")}
            </h3>
            <div className="mx-auto mb-6 mt-2 w-14">
              <Image src={heavyRain} alt="" layout="responsive" />
            </div>
            <div className="flex justify-between">
              <span>{Math.floor(data.main.temp_max)}&#176;C</span>
              <span className="grey-text">
                {Math.floor(data.main.temp_min)}&#176;C
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
