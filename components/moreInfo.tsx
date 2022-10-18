import { GoMarkGithub } from "react-icons/go";

type Props = {
  children: React.ReactNode;
};

export default function MoreInfo({ children }: Props): JSX.Element {
  return (
    <div className="dark-background py-8">
      {children}
      <p className="grey-text flex items-center justify-center gap-1 text-center text-sm">
        created by{" "}
        <a href="" className="font-bold underline">
          @atharvpote
        </a>{" "}
        - <GoMarkGithub className="text-sm" /> GitHub
      </p>
    </div>
  );
}
