import { type ProductMetadata } from "@prisma/client";
import { type FC } from "react";

import Price from "../Price";

interface Props {
  product: ProductMetadata;
}

const CheckoutItem: FC<Props> = ({ product }) => {
  return (
    <div className="w-[600px] items-center gap-5 px-10 py-5 rounded-xl shadow-md border border-black/50">
      <img
        src={product.images[0]}
        alt=""
        className="h-[100px] rounded-md"
      />
      <div className="flex-col w-full">
        <p>{product.name}</p>

        <div>
          Quantity:&nbsp;
          <input
            type="number"
            inputMode="numeric"
            value="1"
            className="form-input border border-gray-300 w-16 rounded-sm focus:border-secondary focus:ring-secondary"
          />
        </div>

        <div>
          Price:&nbsp;
          <Price
            num={10}
            numSize="12"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
