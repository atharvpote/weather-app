export async function getWeatherData(
  latitude: number,
  longitude: number
): Promise<
  | {
      success: true;
      weather: WeatherData;
    }
  | RequestError
> {
  const currentWeatherReq = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
      process.env.OW_KEY as string
    }&units=metric`
  );
  const currentWeatherRes = (await currentWeatherReq.json()) as
    | WeatherData
    | FailedRequest;

  if (Object.hasOwn(currentWeatherRes, "message"))
    return {
      success: false,
      error: currentWeatherRes as FailedRequest,
    };

  return {
    success: true,
    weather: currentWeatherRes as WeatherData,
  };
}

export async function getForecastData(
  latitude: number,
  longitude: number
): Promise<
  | {
      success: true;
      forecast: ForecastData;
    }
  | RequestError
> {
  const weatherForecastReq = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${
      process.env.OW_KEY as string
    }&units=metric`
  );
  const weatherForecastRes = (await weatherForecastReq.json()) as
    | ForecastData
    | FailedRequest;

  if (Object.hasOwn(weatherForecastReq, "message"))
    return {
      success: false,
      error: weatherForecastRes as FailedRequest,
    };

  return {
    success: true,
    forecast: weatherForecastRes as ForecastData,
  };
}

export type WeatherData = {
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

export type ForecastDataObject = {
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

export type ForecastData = {
  cod: number;
  list: ForecastDataObject[];
};

export type FailedRequest = {
  cod: number;
  message: string;
};

type RequestError = {
  success: false;
  error: FailedRequest;
};
