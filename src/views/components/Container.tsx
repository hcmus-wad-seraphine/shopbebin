import type { FC, ReactNode } from "react";

import Header from "../layouts/Header";

interface Props {
  children?: ReactNode;
  className?: string;
}

const Container: FC<Props> = ({ children, className }) => {
  return (
    <div className={`flex-col ${className} w-full`}>
      <Header />
      <div className="w-full lg:max-w-4xl xl:max-w-6xl mx-auto flex-col">{children}</div>
    </div>
  );
};

export default Container;
