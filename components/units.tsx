export default function Units(): JSX.Element {
  return (
    <div className="mx-6 hidden gap-3 md:flex md:justify-end">
      <button className="medium-grey-background h-10 w-10 rounded-full text-lg font-semibold shadow-md">
        &#176;C
      </button>
      <button className="medium-grey-background h-10 w-10 rounded-full text-lg font-semibold shadow-md">
        &#176;F
      </button>
    </div>
  );
}
