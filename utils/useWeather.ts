import useSWR, { Fetcher } from "swr";

export type Coords =
  | {
      latitude: number | undefined;
      longitude: number | undefined;
    }
  | undefined;

export default function useWeather(
  arg: Coords
): OWSuccessfulResponse | undefined {
  const { data } = useSWR<OWSuccessfulResponse>(
    arg && arg.latitude && arg.longitude
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${
          arg.latitude
        }&lon=${arg.longitude}&appid=${
          process.env.NEXT_PUBLIC_OWM_KEY as string
        }&units=metric`
      : null,
    fetcher
  );

  return data;
}

type OWSuccessfulResponse = {
  weather: [
    {
      main: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
  cod: "200";
  message: undefined;
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
