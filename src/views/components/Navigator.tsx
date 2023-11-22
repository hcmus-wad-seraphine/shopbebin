import type { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
  href: string;
  title: string;
}

const Navigator: FC<Props> = ({ href, title }) => {
  return (
    <Link
      to={href}
      className="px-2 py-1 text-white"
    >
      {title}
    </Link>
  );
};

export default Navigator;
