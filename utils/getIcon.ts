import type { StaticImageData } from "next/image";
import clear from "../public/Clear.png";
import lightCloud from "../public/LightCloud.png";
import heavyCloud from "../public/HeavyCloud.png";
import snow from "../public/Snow.png";
import sleet from "../public/Sleet.png";
import lightRain from "../public/LightRain.png";
import heavyRain from "../public/HeavyRain.png";
import thunderstorm from "../public/Thunderstorm.png";
import haze from "../public/Haze.png";
import shower from "../public/Shower.png";
import hail from "../public/Hail.png";

export default function getIcon(
  weather: string,
  description?: string
): StaticImageData {
  if (weather == "Clear") return clear;

  if (weather == "Clouds") {
    if (
      description?.toLowerCase() == "few clouds: 11-25%" ||
      description?.toLowerCase() == "scattered clouds: 25-50%"
    )
      return lightCloud;

    return heavyCloud;
  }
  if (weather == "Snow") {
    if (description?.toLowerCase().includes("heavy snow")) return hail;

    if (description?.toLowerCase().includes("shower" || "rain")) return sleet;

    return snow;
  }
  if (weather == "Rain") {
    if (description?.toLowerCase().includes("shower")) return shower;

    if (description?.toLowerCase().includes("light")) return lightRain;

    return heavyRain;
  }
  if (weather == "Haze") return haze;

  if (weather == "Drizzle") return heavyRain;

  return thunderstorm;
}
