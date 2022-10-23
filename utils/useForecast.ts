import useSWR, { Fetcher } from "swr";

export type WeatherData = {
  main: {
    temp_min: number;
    temp_max: number;
  };
  weather: [
    {
      icon: string;
      description: string;
    }
  ];
  dt_txt: string;
};

export type Coords =
  | {
      latitude: number | undefined;
      longitude: number | undefined;
    }
  | undefined;

export default function useForecast(
  arg: Coords
): OWSuccessfulResponse | undefined {
  const { data } = useSWR<OWSuccessfulResponse>(
    arg && arg.latitude && arg.longitude
      ? `https://api.openweathermap.org/data/2.5/forecast?lat=${
          arg.latitude
        }&lon=${arg.longitude}&appid=${
          process.env.NEXT_PUBLIC_OWM_KEY as string
        }&units=metric&exclude=current,minutely,hourly,alerts`
      : null,
    fetcher
  );

  return data;
}

export type OWSuccessfulResponse = {
  list: WeatherData[];
  cod: "200";
  message: number;
};

type OWBadResponse = {
  cod: string;
  message: string;
};

const fetcher: Fetcher<OWSuccessfulResponse> = async (
  key: RequestInfo | URL
) => {
  const response = await fetch(key);
  const data = (await response.json()) as OWSuccessfulResponse | OWBadResponse;

  const code = Number.parseInt(data.cod);
  if (code < 200 || code >= 300) {
    throw new Error("Error occurred while fetching IP Address", {
      cause: data.message,
    });
  }

  return data as OWSuccessfulResponse;
};
