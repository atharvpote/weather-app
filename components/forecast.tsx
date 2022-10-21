import Image from "next/image";

export default function Forecast(): JSX.Element {
  return (
    <div className=" mx-6 flex flex-wrap justify-center gap-6 pt-8 pb-16">
      {new Array(5).fill("").map((_, i) => (
        <article
          key={i}
          className="medium-dark-background basis-32 px-4 py-4 font-medium shadow-lg"
        >
          <h3 className="text-center">Tomorrow</h3>
          <div className="relative mx-auto my-4">
            {
              <Image
                src={"http://openweathermap.org/img/wn/10d@2x.png"}
                alt=""
                height={100}
                width={100}
              />
            }
          </div>
          <div className="flex justify-between">
            <span>31&#176;C</span>
            <span className="grey-text">21&#176;C</span>
          </div>
        </article>
      ))}
    </div>
  );
}
