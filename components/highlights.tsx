import { MdNavigation } from "react-icons/md";

export default function Highlights(): JSX.Element {
  return (
    <section className="mx-6">
      <h2 className="mb-8 text-2xl font-bold">{`Today's Highlights`}</h2>
      <div className="mb-8 flex flex-wrap justify-center gap-8">
        <Article title="Wind status" highlight="7" unit="mph">
          <div className="flex items-center justify-center gap-4">
            <span className="transparent-grey-background flex items-center justify-center rounded-full p-[0.3rem]">
              <MdNavigation className="rotate-[225deg] text-xs" />
            </span>
            <span>WSW</span>
          </div>
        </Article>
        <Article title="Humidity" highlight="84" unit="%">
          <div className="white-background relative mx-auto h-2 w-3/4 rounded-2xl">
            <div
              style={{ width: `${84}%` }}
              className={`yellow-background absolute h-full rounded-2xl`}
            ></div>
            <span className="absolute top-0 left-0 -translate-y-full text-xs">
              0
            </span>
            <span className="absolute top-0 left-1/2 -translate-y-full -translate-x-1/2 text-xs">
              50
            </span>
            <span className="absolute top-0 left-full -translate-y-full -translate-x-full text-xs">
              100
            </span>
            <span className="absolute top-0 left-full translate-y-1/2 -translate-x-full text-xs">
              %
            </span>
          </div>
        </Article>
        <Article title="Visibility" highlight="6,4" unit="miles" />
        <Article title="Air Pressure" highlight="998" unit="mb" />
      </div>
    </section>
  );
}

type Props = {
  title: string;
  highlight: string;
  unit: string;
  children?: React.ReactNode;
};

function Article({ title, highlight, unit, children }: Props): JSX.Element {
  return (
    <article className="medium-dark-background flex-grow basis-64 p-8 text-center shadow-lg">
      <h3 className="mb-8 font-medium">{title}</h3>
      <p className="mb-12 text-4xl font-medium">
        <span className="text-7xl font-bold">{highlight}</span>
        {unit}
      </p>
      {children}
    </article>
  );
}
