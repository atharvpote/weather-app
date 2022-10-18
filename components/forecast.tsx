import Image from "next/image";
import heavyRain from "../public/HeavyRain.png";

export default function Forecast(): JSX.Element {
  return (
    <div className="mx-auto grid w-72 grid-cols-2 justify-items-center gap-6 py-16">
      {new Array(5).fill(1).map((_, index) => (
        <article key={index} className="medium-dark-background w-32 px-4 py-4">
          <h3 className="text-center">Tomorrow</h3>
          <div className="mx-auto mb-6 mt-2 w-14">
            <Image src={heavyRain} alt="" layout="responsive" />
          </div>
          <div className="flex justify-between">
            <span>16&#176;C</span>
            <span className="grey-text">11&#176;C</span>
          </div>
        </article>
      ))}
    </div>
  );
}
