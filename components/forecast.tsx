import Image from "next/image";
import heavyRain from "../public/HeavyRain.png";

export default function Forecast(): JSX.Element {
  return (
    <div className=" mx-6 flex flex-wrap justify-center gap-6 pt-8 pb-16">
      {new Array(5).fill(1).map((_, index) => (
        <article
          key={index}
          className="medium-dark-background basis-32 px-4 py-4 font-medium shadow-lg"
        >
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
