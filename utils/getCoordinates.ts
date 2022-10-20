type SuccessfulRes = {
  success: true;
  latitude: number;
  longitude: number;
};

type FailedRes = {
  success: false;
  message: string;
};

export default async function getCoordinates(): Promise<
  SuccessfulRes | FailedRes
> {
  const req = await fetch("http://ipwho.is/");
  const res = (await req.json()) as SuccessfulRes | FailedRes;

  return res;
}
