export default async function getCoordinates(
  ip: string
): Promise<SuccessfulRes | FailedRes> {
  const req = await fetch(`http://ipwho.is/${ip}`);
  const res = (await req.json()) as SuccessfulRes | FailedRes;

  return res;
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
