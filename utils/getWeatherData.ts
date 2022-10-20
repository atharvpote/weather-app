export type CurrentWeatherData = {
  code: number;
  message: null;
  weather: [
    {
      main: string;
      description: string;
    }
  ];
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
};

export type DailyForecastData = {
  weather: [
    {
      main: string;
      description: string;
    }
  ];
  main: {
    temp_min: number;
    temp_max: number;
  };
  dt_txt: string;
};

export type WeatherForecastData = {
  cod: number;
  message: null;
  list: DailyForecastData[];
};

type FailedWeatherRequest = {
  cod: number;
  message: string;
};

type WeatherAndForecastData = {
  message: null;
  weather: CurrentWeatherData;
  forecast: WeatherForecastData;
};

export default async function getWeatherData(
  latitude: number,
  longitude: number
): Promise<WeatherAndForecastData | FailedWeatherRequest> {
  const currentWeatherReq = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
      process.env.OW_KEY as string
    }&units=metric`
  );
  const currentWeatherRes = (await currentWeatherReq.json()) as
    | CurrentWeatherData
    | FailedWeatherRequest;

  if (currentWeatherRes.message !== null) return currentWeatherRes;

  const weatherForecastReq = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${
      process.env.OW_KEY as string
    }&units=metric`
  );
  const weatherForecastRes = (await weatherForecastReq.json()) as
    | WeatherForecastData
    | FailedWeatherRequest;

  if (weatherForecastRes.message !== null) return weatherForecastRes;

  return {
    message: null,
    weather: currentWeatherRes,
    forecast: weatherForecastRes,
  };
}
