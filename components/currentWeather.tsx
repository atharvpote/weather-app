import Image from "next/image";
import { MdLocationOn, MdGpsFixed } from "react-icons/md";
import clear from "../public/Clear.png";

export default function CurrentWeather(): JSX.Element {
  return (
    <section className="medium-dark-background grid min-h-screen">
      <div>
        <div className="flex items-center justify-between px-4 pt-6">
          <button className="light-grey-background py-2 px-4 text-white shadow-md shadow-gray-900">
            Search for places
          </button>
          <span className="light-grey-background inline-block rounded-full p-2 shadow-md shadow-gray-900">
            <MdGpsFixed className="text-2xl" />
          </span>
        </div>
        <div className="relative grid h-80 place-content-center after:absolute after:top-0 after:h-full after:w-full after:bg-[url('../public/Cloud-background.png')] after:bg-cover after:bg-center after:opacity-10">
          <div className="mx-auto w-36">
            <Image
              src={clear}
              alt=""
              layout="responsive"
              className="opacity-100"
            />
          </div>
        </div>
        <div className="text-center">
          <h1 className="mb-6 text-9xl">
            15<span className="grey-text text-5xl">&#176;C</span>
          </h1>
          <div className="grey-text">
            <h2 className=" mb-10 text-4xl">Shower</h2>
            <div className="text-lg">
              <div className="mb-8 flex items-center justify-center gap-4">
                <span>Today</span>
                <span className="grey-background inline-block h-1 w-1 rounded-full"></span>
                <span>Fri. 5 Jun</span>
              </div>
              <h2 className="flex items-center justify-center gap-1 font-medium">
                <MdLocationOn className="text-2xl" /> Helsinki
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
