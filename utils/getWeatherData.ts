export type OWCurrWeatherRes = {
  message: number | string;
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

export type DailyForecast = {
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

export type OWWeatherForecastRes = {
  list: DailyForecast[];
};

export default async function getWeatherData(
  latitude: number,
  longitude: number
): Promise<{
  weather: OWCurrWeatherRes;
  forecast: OWWeatherForecastRes;
}> {
  const resOWCurrWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
      process.env.OW_KEY as string
    }&units=metric`
  );
  const weather = (await resOWCurrWeather.json()) as OWCurrWeatherRes;

  const resOWWeatherForecast = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${
      process.env.OW_KEY as string
    }&units=metric`
  );
  const forecast = (await resOWWeatherForecast.json()) as OWWeatherForecastRes;

  return { weather, forecast };
}
