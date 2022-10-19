export default async function getCoordinates(
  ip: string
): Promise<{ success: boolean; latitude: number; longitude: number }> {
  const reqIpWhoIs = await fetch(`http://ipwho.is/${ip}`);
  const resIpWhoIs = (await reqIpWhoIs.json()) as {
    success: boolean;
    latitude: number;
    longitude: number;
  };

  return resIpWhoIs;
}
