import useSWR, { Key, Fetcher } from "swr";

export default function useCityData(query: string): CityData | undefined {
  const key: Key = `/api/cities/${query}`;

  const { data } = useSWR<CityData>(query ? key : null, fetcher);

  return data;
}

type CityData = {
  data: City[];
};

export type City = {
  city: string;
  latitude: number;
  longitude: number;
};

const fetcher: Fetcher<CityData> = (arg: RequestInfo | URL) =>
  fetch(arg).then((res) => res.json());
