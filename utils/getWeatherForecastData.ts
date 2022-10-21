export async function getWeatherForecastData(
  latitude: number,
  longitude: number,
  type: "weather" | "forecast"
): Promise<
  | {
      success: true;
      type: "weather";
      weather: WeatherData;
    }
  | {
      success: true;
      type: "forecast";
      forecast: ForecastData;
    }
  | ErrorRes
> {
  const req = await fetch(
    `https://api.openweathermap.org/data/2.5/${type}?lat=${latitude}&lon=${longitude}&appid=${
      process.env.NEXT_PUBLIC_OW_KEY as string
    }&units=metric`
  );
  const res = (await req.json()) as
    | WeatherData
    | ForecastData
    | FailedWeatherRequest;

  if (![200, "200"].some((cod) => cod === res.cod))
    return {
      success: false,
      error: res as FailedWeatherRequest,
    };

  if (type === "weather")
    return {
      success: true,
      type: "weather",
      weather: res as WeatherData,
    };
  else
    return {
      success: true,
      type: "forecast",
      forecast: res as ForecastData,
    };
}

export type WeatherData = {
  cod: 200;
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

export type ForecastData = {
  cod: "200";
  list: ForecastDataObject[];
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

export type FailedWeatherRequest = {
  cod: number | string;
  message: string;
};

type ErrorRes = {
  success: false;
  error: FailedWeatherRequest;
};
