import { NextApiRequest, NextApiResponse } from "next";

type CityData = {
  data: City[];
};

type City = {
  city: string;
  latitude: number;
  longitude: number;
};

export default async function getCity(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { city } = req.query;

  if (!Array.isArray(city) && city) {
    try {
      const key = `http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0&namePrefix=${city}`;
      const request = await fetch(key);
      const response = (await request.json()) as CityData;

      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  } else res.status(400).send({ error: "wrong query term" });
}
