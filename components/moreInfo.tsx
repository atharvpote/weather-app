import { FaGithub } from "react-icons/fa6";

type Props = {
  children: React.ReactNode;
};

export default function MoreInfo({ children }: Props): JSX.Element {
  return (
    <div
      className="dark-background flex basis-full flex-col items-center justify-center pt-6 pb-8
    "
    >
      <div className="max-w-[788px]">{children}</div>
      <p className="grey-text flex items-center justify-center gap-1 text-center text-sm">
        created by{" "}
        <a
          href="https://github.com/atharvpote/"
          target="_blank"
          rel="noreferrer"
          className="font-bold underline"
        >
          @atharvpote
        </a>{" "}
        - <FaGithub className="text-sm" /> GitHub
      </p>
    </div>
  );
}
