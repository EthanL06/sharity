import Link from "next/link";

type Props = {};
const Logo = (props: Props) => {
  return (
    <Link
      href={"/"}
      className="text-center font-sans text-4xl font-bold text-primary"
    >
      sharity.
    </Link>
  );
};
export default Logo;
