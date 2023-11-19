import type { FC, ReactNode } from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

interface Props {
  isAdmin?: boolean;
  children?: ReactNode;
  className?: string;
}

const Container: FC<Props> = ({ isAdmin, children, className }) => {
  return (
    <div className={`flex-col ${className} w-full`}>
      <Header isAdmin={isAdmin} />
      {children}
      <Footer />
    </div>
  );
};

export default Container;
