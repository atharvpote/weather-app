import useSWR, { Key, Fetcher } from "swr";

export default function useCityData(query: string): CityData | undefined {
  const key: Key = `http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0&namePrefix=${query}`;

  const { data } = useSWR<CityData>(query ? key : null, fetcher);

  return data;
}

type CityData = {
  data: City[];
};

type City = {
  city: string;
  latitude: number;
  longitude: number;
};

const fetcher: Fetcher<CityData> = (arg: RequestInfo | URL) =>
  fetch(arg).then((res) => res.json());
