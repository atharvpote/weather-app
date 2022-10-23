import useSWR, { Key, Fetcher } from "swr";

export default function useLocation(): LocationData | undefined {
  const key: Key = "https://ipwho.is/";
  const { data } = useSWR<LocationData>(key, fetcher);

  return data;
}

const fetcher: Fetcher<LocationData> = async (key: RequestInfo | URL) => {
  const response = await fetch(key);
  const data = (await response.json()) as
    | IPWhoIsSuccessfulResponse
    | IPWhoIsBadResponse;

  if (!data.success)
    throw new Error("Error occurred while fetching IP Address", {
      cause: data.message,
    });

  return { latitude: data.latitude, longitude: data.longitude };
};

type LocationData = { latitude: number; longitude: number };

type IPWhoIsSuccessfulResponse = {
  success: true;
  latitude: number;
  longitude: number;
};

type IPWhoIsBadResponse = {
  success: false;
  message: string;
};
