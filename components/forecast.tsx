import Image from "next/image";
import { format } from "date-fns";
import useLocation from "../utils/useLocation";
import useForecast, { Coords } from "../utils/useForecast";
import extractForecastData from "../utils/extractForecastData";

export default function Forecast({
  auto,
  coords,
}: {
  auto: boolean;
  coords: Coords;
}): JSX.Element {
  const location = useLocation();
  const forecast = useForecast(
    auto
      ? {
          latitude: location?.latitude,
          longitude: location?.longitude,
        }
      : coords
  );

  return (
    <div className=" mx-6 flex flex-wrap justify-center gap-6 pt-8 pb-16">
      {forecast
        ? extractForecastData(forecast).map((data, i) => {
            if (i !== 0)
              return (
                <article
                  key={i}
                  className="medium-dark-background basis-32 px-4 py-4 font-medium shadow-lg"
                >
                  <h3 className="text-center">
                    {i === 1
                      ? "Tomorrow"
                      : format(new Date(data.dt_txt), "EEE. d MMM")}
                  </h3>
                  <div className="relative mx-auto my-4">
                    {
                      <Image
                        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                        alt=""
                        height={100}
                        width={100}
                      />
                    }
                  </div>
                  <div className="flex justify-between">
                    <span>{Math.round(data.main.temp_max)}&#176;C</span>
                    <span className="grey-text">
                      {Math.round(data.main.temp_min)}&#176;C
                    </span>
                  </div>
                </article>
              );
          })
        : new Array(5).fill(1).map((_, i) => (
            <article
              key={i}
              className="medium-dark-background basis-32 px-4 py-4 font-medium shadow-lg"
            >
              <h3 className="text-center opacity-0"></h3>
              <div className="relative mx-auto my-4 opacity-0">
                <div className="h-[100px] w-[100px] opacity-0"></div>
              </div>
              <div className="flex justify-between opacity-0">
                <span>C</span>
                <span className="grey-text opacity-0"></span>
              </div>
            </article>
          ))}
    </div>
  );
}
