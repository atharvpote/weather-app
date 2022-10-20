export type CurrentWeatherData = {
  code: number;
  weather: [
    {
      id: number;
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
  dt: number;
  weather: [
    {
      id: number;
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
  list: DailyForecastData[];
};

export type FailedWeatherRequest = {
  cod: number;
  message: string;
};

type WeatherAndForecastData = {
  success: true;
  weather: CurrentWeatherData;
  forecast: WeatherForecastData;
};

type RequestError = {
  success: false;
  error: FailedWeatherRequest;
};

export default async function getWeatherData(
  latitude: number,
  longitude: number
): Promise<WeatherAndForecastData | RequestError> {
  const currentWeatherReq = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
      process.env.OW_KEY as string
    }&units=metric`
  );
  const currentWeatherRes = (await currentWeatherReq.json()) as
    | CurrentWeatherData
    | FailedWeatherRequest;

  if (Object.hasOwn(currentWeatherRes, "message"))
    return {
      success: false,
      error: currentWeatherRes as FailedWeatherRequest,
    };

  const weatherForecastReq = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${
      process.env.OW_KEY as string
    }&units=metric`
  );
  const weatherForecastRes = (await weatherForecastReq.json()) as
    | WeatherForecastData
    | FailedWeatherRequest;

  if (Object.hasOwn(weatherForecastReq, "message"))
    return {
      success: false,
      error: weatherForecastRes as FailedWeatherRequest,
    };

  return {
    success: true,
    weather: currentWeatherRes as CurrentWeatherData,
    forecast: weatherForecastRes as WeatherForecastData,
  };
}
