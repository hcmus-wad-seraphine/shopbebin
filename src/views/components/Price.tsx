import { FC } from "react";
interface Props {
  num: number;
  numSize: string;
}

const Price: FC<Props> = ({ num, numSize }) => {
  return (
    <>
      <span className={numSize}>{num}</span>
    </>
  );
};

export default Price;
