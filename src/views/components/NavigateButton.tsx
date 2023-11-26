import { type FC, type ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  style?: string;
  to: string;
  children?: ReactNode;
}

const NavigateButton: FC<Props> = ({ to, children, style }) => {
  return (
    <Link
      to={to}
      className={`flex bg-gradient-to-b from-primary to-secondary px-3 py-2 justify-center items-center rounded-full gap-2 text-white ${style}`}
    >
      {children}
    </Link>
  );
};

export default NavigateButton;
