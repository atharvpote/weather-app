import useSWR from "swr";

export default function useCoordinates():
  | SuccessfulRes
  | FailedRes
  | undefined {
  const key = "http://ipwho.is/";

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const fetcher = (arg: RequestInfo | URL) =>
    fetch(arg).then((res) => res.json());

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error } = useSWR(key, fetcher);

  if (error) return error as FailedRes | undefined;

  return data as SuccessfulRes | undefined;
}

type SuccessfulRes = {
  success: true;
  latitude: number;
  longitude: number;
};

type FailedRes = {
  success: false;
  message: string;
};
