import type { FC } from "react";

interface Props {
  href: string;
  title: string;
}

const Navigator: FC<Props> = ({ href, title }) => {
  return (
    <a href={href} className="px-2 py-1 text-white">
      {title}
    </a>
  );
};

export default Navigator;
