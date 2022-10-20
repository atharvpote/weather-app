import type { ForecastDataObject } from "./getWeatherAndForecastData";

export default function extractForecastData(
  list: ForecastDataObject[]
): ExtractedForecastData {
  const separatedData = new Map<string, WeatherData[]>();

  list?.forEach((data) => {
    if (!separatedData.has(data.dt_txt.split(" ")[0]))
      separatedData.set(data.dt_txt.split(" ")[0], []);

    separatedData.get(data.dt_txt.split(" ")[0])?.push({
      date: data.dt_txt,
      minTemp: data.main.temp_min,
      maxTemp: data.main.temp_max,
      weatherId: data.weather[0].id,
    });
  });

  const forecastData: { [key: string]: WeatherData } = {};

  for (const arr of Array.from(separatedData.entries())) {
    const date = arr[0];
    const weatherData = arr[1];
    const IdCounter = new Map<number, number>();

    let minTemp: number | null = null;
    let maxTemp: number | null = null;

    for (const dataPoint of weatherData) {
      if (!minTemp) minTemp = dataPoint.minTemp;
      else if (minTemp > dataPoint.minTemp) minTemp = dataPoint.minTemp;

      if (!maxTemp) maxTemp = dataPoint.maxTemp;
      else if (maxTemp < dataPoint.maxTemp) maxTemp = dataPoint.maxTemp;

      const weatherCount = IdCounter.get(dataPoint.weatherId);
      if (!weatherCount) IdCounter.set(dataPoint.weatherId, 1);
      else IdCounter.set(dataPoint.weatherId, weatherCount + 1);
    }

    const commonWeatherID = Array.from(IdCounter.entries()).sort((a, b) => {
      if (a[1] - b[1] > 0) return -1;
      if (a[1] - b[1] < 0) return 1;
      else return 0;
    })[0][0];

    forecastData[date] = {
      date: date,
      minTemp: minTemp as number,
      maxTemp: maxTemp as number,
      weatherId: commonWeatherID,
    };
  }

  return forecastData;
}

type WeatherData = {
  date: string;
  minTemp: number;
  maxTemp: number;
  weatherId: number;
};

export type ExtractedForecastData = {
  [key: string]: WeatherData;
};
