import type { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  href: string;
  icon: ReactNode;
  title: string;
}

const Navigator: FC<Props> = ({ href, title, icon }) => {
  return (
    <Link
      to={href}
      className="flex gap-2 px-2 py-1 text-white justify-center items-center"
    >
      {icon}
      <p>{title}</p>
    </Link>
  );
};

export default Navigator;
