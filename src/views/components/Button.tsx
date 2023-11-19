import { FC, ReactNode } from "react";

interface Props {
  style?: string;
  href: string;
  children?: ReactNode;
}

const Button: FC<Props> = ({ href, children, style }) => {
  return (
    <a
      href={href}
      className={`flex bg-gradient-to-b from-primary to-secondary px-3 py-2 justify-center items-center rounded-full gap-2 text-white ${style}`}
    >
      {children}
    </a>
  );
};

export default Button;
