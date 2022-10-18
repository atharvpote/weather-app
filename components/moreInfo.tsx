type Props = {
  children: React.ReactNode;
};

export default function MoreInfo({ children }: Props): JSX.Element {
  return <div className="dark-background">{children}</div>;
}
