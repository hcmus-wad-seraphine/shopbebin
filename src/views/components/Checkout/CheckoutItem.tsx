import { type CartItem } from "@prisma/client";
import { type FC } from "react";

import Price from "../Price";

const CheckoutItem: FC<CartItem> = (item) => {
  return (
    <div className="w-[600px] items-center gap-5 px-10 py-5 rounded-xl shadow-md border border-black/50">
      <img
        src={item.image}
        alt=""
        className="h-[100px] rounded-md"
      />
      <div className="flex-col w-full">
        <p>{item.name}</p>

        <div>Quantity {item.quantity}</div>

        <div>
          Price:&nbsp;
          <Price
            num={item.price * item.quantity}
            numSize="12"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
