import { Dispatch } from "react";

type Props = {
  useImperial: boolean;
  setUseImperial: Dispatch<boolean>;
};

export default function UnitSystemToggle({
  useImperial,
  setUseImperial,
}: Props): JSX.Element {
  return (
    <div className="mx-6 hidden gap-3 md:flex md:justify-end">
      <button
        className={`h-10 w-10 rounded-full text-lg font-semibold shadow-md transition-all ${
          !useImperial ? "white-background dark-text" : "medium-grey-background"
        }`}
        onClick={(): void => setUseImperial(false)}
      >
        &#176;C
      </button>
      <button
        className={`h-10 w-10 rounded-full text-lg font-semibold shadow-md transition-all ${
          useImperial ? "white-background dark-text" : "medium-grey-background"
        }`}
        onClick={(): void => setUseImperial(true)}
      >
        &#176;F
      </button>
    </div>
  );
}
