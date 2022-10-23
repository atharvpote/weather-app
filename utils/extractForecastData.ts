import { OWSuccessfulResponse, WeatherData } from "../utils/useForecast";

export default function extractForecastData(
  forecast: OWSuccessfulResponse
): WeatherData[] {
  const groupedByDate = new Map<string, WeatherData[]>();

  forecast.list.forEach((data) => {
    if (!groupedByDate.has(data.dt_txt.split(" ")[0]))
      groupedByDate.set(data.dt_txt.split(" ")[0], []);

    groupedByDate.get(data.dt_txt.split(" ")[0])?.push(data);
  });

  const forecastData: { [key: string]: WeatherData } = {};

  for (const arr of Array.from(groupedByDate.entries())) {
    const date = arr[0];
    const data = arr[1];
    const counter = new Map<string, { count: number; desc: string }>();

    let minTemp: number | null = null;
    let maxTemp: number | null = null;

    for (const entry of data) {
      if (!minTemp) minTemp = entry.main.temp_min;
      else if (minTemp > entry.main.temp_min) minTemp = entry.main.temp_min;

      if (!maxTemp) maxTemp = entry.main.temp_max;
      else if (maxTemp < entry.main.temp_max) maxTemp = entry.main.temp_max;

      const currentCount = counter.get(entry.weather[0].icon)?.count;

      if (!currentCount)
        counter.set(entry.weather[0].icon, {
          count: 1,
          desc: entry.weather[0].description,
        });
      else
        counter.set(entry.weather[0].icon, {
          count: currentCount + 1,
          desc: entry.weather[0].description,
        });
    }

    const commonIcon = Array.from(counter.entries()).sort((a, b) => {
      if (a[1].count - b[1].count > 0) return -1;
      if (a[1].count - b[1].count < 0) return 1;
      else return 0;
    })[1];

    forecastData[date] = {
      main: {
        temp_min: minTemp as number,
        temp_max: maxTemp as number,
      },
      dt_txt: date,
      weather: [{ icon: commonIcon[0], description: commonIcon[1].desc }],
    };
  }

  return Object.values(forecastData);
}
