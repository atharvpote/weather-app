import thunderstorm from "../icons/thunderstorms.svg";
import drizzle from "../icons/rainy-1.svg";
import rain from "../icons/rainy-3.svg";
import snow from "../icons/snowy-3.svg";
import fog from "../icons/fog.svg";
import haze from "../icons/haze.svg";
import dust from "../icons/dust.svg";
import tornado from "../icons/tornado.svg";
import clearDay from "../icons/clear-day.svg";
import clouds from "../icons/cloudy.svg";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function getIcon(weatherID: number): any {
  if (weatherID >= 200 && weatherID < 300) return thunderstorm;
  if (weatherID >= 300 && weatherID < 400) return drizzle;
  if (weatherID >= 500 && weatherID < 600) return rain;
  if ((weatherID >= 600 && weatherID < 700) || weatherID == 771) return snow;
  if (weatherID == 701 || weatherID == 711 || weatherID == 741) return fog;
  if (weatherID == 721) return haze;
  if (
    weatherID == 731 ||
    weatherID == 751 ||
    weatherID == 761 ||
    weatherID == 762
  )
    return dust;
  if (weatherID == 781) return tornado;
  if (weatherID == 800) return clearDay;
  if (weatherID > 800 || weatherID < 900) return clouds;
}
