import { Dispatch } from "react";
import { MdClose, MdOutlineSearch } from "react-icons/md";

type Props = {
  status: boolean;
  closer: Dispatch<boolean>;
};

export default function Search({ status, closer }: Props): JSX.Element {
  return (
    <div
      className={`medium-dark-background absolute top-0 left-0 z-10 h-full w-full bg-black p-4 opacity-100 transition-all ${
        status ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="mb-8 flex justify-end">
        <button onClick={(): void => closer(false)}>
          <MdClose className="text-2xl" />
        </button>
      </div>
      <div className="flex h-12 gap-4">
        <div className="flex basis-full items-stretch border-2 border-[var(--grey)]">
          <div className="flex items-center px-3">
            <MdOutlineSearch className="fill-[var(--grey)] text-2xl opacity-50" />
          </div>
          <input
            type="text"
            placeholder="Search location"
            className="w-full bg-transparent placeholder:text-[var(--grey)] placeholder:opacity-50"
          />
        </div>
        <button className="blue-background px-5">Search</button>
      </div>
    </div>
  );
}
