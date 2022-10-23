import useSWR, { Fetcher } from "swr";

export default function useWeather(
  latitude: number | undefined,
  longitude: number | undefined
): OWSuccessfulResponse | undefined {
  const { data } = useSWR<OWSuccessfulResponse>(
    longitude && latitude
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
          process.env.NEXT_PUBLIC_OWM_KEY as string
        }&units=metric`
      : null,
    fetcher
  );

  return data;
}

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

export type OWSuccessfulResponse = {
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
