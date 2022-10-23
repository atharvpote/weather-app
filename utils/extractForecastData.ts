import { WeatherData } from "./useForecast";

export default function extractForecastData(list: WeatherData[]): {
  [key: string]: Extracted;
} {
  const grouped = groupByDate(list);

  const merged: { [key: string]: Extracted } = {};
  for (const key in grouped) merged[key] = mergeData(grouped[key]);

  return merged;
}

function groupByDate(list: WeatherData[]): {
  [key: string]: WeatherData[];
} {
  const grouped: { [key: string]: WeatherData[] } = {};

  list.forEach((data) => {
    const key = data.dt_txt.split(" ")[0];

    if (!grouped[key]) grouped[key] = [];

    grouped[key].push(data);
  });

  return grouped;
}

type Extracted = {
  min: number | null;
  max: number | null;
  icon: string;
  description: string;
};

function mergeData(list: WeatherData[]): Extracted {
  let min: number | null = null;
  let max: number | null = null;

  const iconCount: { [key: string]: { count: number; description: string } } =
    {};

  for (const value of list) {
    const minTemp = value.main.temp_min;
    const maxTemp = value.main.temp_max;
    const icon = value.weather[0].icon;
    const description = value.weather[0].description;

    if (!min) min = minTemp;
    else if (min > minTemp) min = minTemp;

    if (!max) max = maxTemp;
    else if (max < maxTemp) max = maxTemp;

    if (!iconCount[icon])
      iconCount[icon] = { count: 1, description: description };

    iconCount[icon].count = iconCount[icon].count + 1;
  }

  const sorted = Object.entries(iconCount).sort((a, b) => {
    if (a[1].count - b[1].count > 0) return -1;
    else if (a[1].count - b[1].count < 0) return 1;
    else return 0;
  });

  const icon = sorted[0][0].substring(0, sorted[0][0].length - 1);
  const description = sorted[0][1].description;

  return { min, max, icon, description };
}
