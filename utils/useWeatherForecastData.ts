import useSWR from "swr";

export function useWeatherData(
  longitude: number,
  latitude: number
): WeatherData | FailedReq | undefined {
  const key = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
    process.env.NEXT_PUBLIC_OWM_KEY as string
  }&units=metric`;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const fetcher = (arg: RequestInfo | URL) =>
    fetch(arg).then((res) => res.json());

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error } = useSWR(key, fetcher);

  if (error) return error as FailedReq | undefined;

  return data as WeatherData | undefined;
}

export function useForecastData(
  longitude: number,
  latitude: number
): ForecastDataList | FailedReq | undefined {
  const key = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${
    process.env.NEXT_PUBLIC_OWM_KEY as string
  }&units=metric`;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const fetcher = (arg: RequestInfo | URL) =>
    fetch(arg).then((res) => res.json());

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error } = useSWR(key, fetcher);

  if (error) return error as FailedReq | undefined;

  return data as ForecastDataList | undefined;
}

type WeatherData = {
  cod: 200;
  weather: [
    {
      id: number;
      main: string;
      description: string;
    }
  ];
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
};

type ForecastDataList = {
  cod: "200";
  list: ForecastData[];
};

export type ForecastData = {
  dt: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
    }
  ];
  main: {
    temp_min: number;
    temp_max: number;
  };
  dt_txt: string;
};

type FailedReq = {
  cod: number | string;
  message: string;
};
