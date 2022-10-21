import useSWR from "swr";

export default function useFetchedData(
  type: "weather" | "forecast",
  longitude: number,
  latitude: number
): any {
  const key = `https://api.openweathermap.org/data/2.5/${type}?lat=${latitude}&lon=${longitude}&appid=${
    process.env.NEXT_PUBLIC_OW_KEY as string
  }&units=metric`;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const fetcher = (arg: RequestInfo | URL) =>
    fetch(arg).then((res) => res.json());

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error } = useSWR(key, fetcher);

  if (error) return error;

  return data;
}
