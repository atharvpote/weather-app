import useSWR from "swr";

export default function useFetchedData(
  type: "weather" | "forecast",
  longitude: number,
  latitude: number
): SuccessWeatherDataRes | SuccessForecastDataListRes | ErrorRes | undefined {
  const key = `https://api.openweathermap.org/data/2.5/${type}?lat=${latitude}&lon=${longitude}&appid=${
    process.env.NEXT_PUBLIC_OWM_KEY as string
  }&units=metric`;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const fetcher = (arg: RequestInfo | URL) =>
    fetch(arg).then((res) => res.json());

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error } = useSWR(key, fetcher);

  if (error)
    return {
      success: false,
      data: error as Error,
    } as ErrorRes | undefined;

  return {
    success: true,
    type,
    data: data as WeatherData | ForecastDataList,
  } as SuccessWeatherDataRes | SuccessForecastDataListRes | undefined;
}

type SuccessWeatherDataRes = {
  success: true;
  type: "weather";
  data: WeatherData;
};

type SuccessForecastDataListRes = {
  success: true;
  type: "forecast";
  data: ForecastDataList;
};

type ErrorRes = {
  success: false;
  data: Error;
};

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

type ForecastData = {
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

type Error = {
  cod: number | string;
  message: string;
};
