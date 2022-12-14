import { MdNavigation } from "react-icons/md";
import toMiles from "../utils/toMiles";
import toMph from "../utils/toMph";
import useLocation from "../utils/useLocation";
import useWeather, { Coords } from "../utils/useWeather";

export default function Highlights({
  deviceLocationByIp,
  coords,
  useImperial,
}: {
  deviceLocationByIp: boolean;
  coords: Coords;
  useImperial: boolean;
}): JSX.Element {
  const location = useLocation();
  const weather = useWeather(
    deviceLocationByIp
      ? {
          latitude: location?.latitude,
          longitude: location?.longitude,
        }
      : coords
  );

  return (
    <section className="mx-6">
      <h2 className="mb-8 text-2xl font-bold">{`Today's Highlights`}</h2>
      <div className="mb-8 flex flex-wrap justify-center gap-8">
        <Article
          title="Wind status"
          highlight={
            weather && useImperial
              ? Math.round(toMph(weather.wind.speed))
              : weather
              ? Math.round(weather.wind.speed)
              : ""
          }
          unit={useImperial ? "mph" : "m/s"}
        >
          <div className="flex items-center justify-center gap-4">
            <span className="transparent-grey-background flex items-center justify-center rounded-full p-[0.3rem]">
              <MdNavigation
                className="text-xs"
                style={{
                  rotate: `${weather ? weather.wind.deg : 0}deg`,
                }}
              />
            </span>
            {/* <span>WSW</span> */}
          </div>
        </Article>
        <Article
          title="Humidity"
          highlight={weather ? Math.round(weather.main.humidity) : ""}
          unit="%"
        >
          <div className="white-background relative mx-auto h-2 w-3/4 rounded-2xl">
            <div
              style={{
                width: `${weather ? Math.round(weather.main.humidity) : 0}%`,
              }}
              className={`yellow-background absolute h-full rounded-2xl`}
            ></div>
            <span className="absolute top-0 left-0 -translate-y-full text-xs">
              0
            </span>
            <span className="absolute top-0 left-1/2 -translate-y-full -translate-x-1/2 text-xs">
              50
            </span>
            <span className="absolute top-0 left-full -translate-y-full -translate-x-full text-xs">
              100
            </span>
            <span className="absolute top-0 left-full translate-y-1/2 -translate-x-full text-xs">
              %
            </span>
          </div>
        </Article>
        <Article
          title="Visibility"
          highlight={
            weather && useImperial
              ? Math.round(toMiles(weather.visibility / 1000))
              : weather
              ? Math.round(weather.visibility / 1000)
              : ""
          }
          unit={useImperial ? "miles" : "km"}
        />
        <Article
          title="Air Pressure"
          highlight={weather ? Math.round(weather.main.pressure) : ""}
          unit="mb"
        />
      </div>
    </section>
  );
}

type ArticleProps = {
  title: string;
  highlight: string | number;
  unit: string;
  children?: React.ReactNode;
};

function Article({
  title,
  highlight,
  unit,
  children,
}: ArticleProps): JSX.Element {
  return (
    <article className="medium-dark-background flex-grow basis-64 p-8 text-center shadow-lg">
      <h3 className="mb-8 font-medium">{title}</h3>
      <p className="mb-12 text-4xl font-medium">
        <span className="text-7xl font-bold">{highlight}</span>
        {unit}
      </p>
      {children}
    </article>
  );
}
