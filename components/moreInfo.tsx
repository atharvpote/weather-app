import { GoMarkGithub } from "react-icons/go";

type Props = {
  children: React.ReactNode;
};

export default function MoreInfo({ children }: Props): JSX.Element {
  return (
    <div
      className="dark-background flex basis-full flex-col items-center justify-center py-8
    "
    >
      <div className="max-w-[788px]">{children}</div>
      <p className="grey-text flex items-center justify-center gap-1 text-center text-sm">
        created by{" "}
        <a
          href="https://github.com/atharvpote/"
          className="font-bold underline"
        >
          @atharvpote
        </a>{" "}
        - <GoMarkGithub className="text-sm" /> GitHub
      </p>
    </div>
  );
}
