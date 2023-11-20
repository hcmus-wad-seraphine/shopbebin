import { FC } from "react";
import Price from "../Price";
import { Product } from "../internal";

interface Props {
  product: Product;
}

const CheckoutItem: FC<Props> = ({ product }) => {
  return (
    <div className="w-[600px] items-center gap-5 px-10 py-5 rounded-xl shadow-md border border-black/50">
      <img src={product.thumbnail} alt="" className="h-[100px] rounded-md" />
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
          <Price num={product.price} numSize="12" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
