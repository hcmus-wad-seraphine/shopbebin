import { type CartItem } from "@prisma/client";
import { type FC } from "react";

import Price from "../Price";

export type ProductInCartProps = CartItem & {
  id: string;
  onUpdateItem: (id: string, quantity: number) => void;
};

const ProductInCart: FC<ProductInCartProps> = ({
  id,
  onUpdateItem,
  name,
  metadataId,
  image,
  price,
  quantity,
}) => {
  return (
    <tr className="text-sm sm:text-base text-gray-600 text-center">
      <td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center gap-4">
        <input type="checkbox" />

        <img
          src={image}
          alt={name}
          height={52}
          width={52}
          className={`rounded-md hidden sm:inline-flex`}
        />

        <a href={`/products/${metadataId}`}>
          <p className="pt-1 hover:text-primary font-medium text-xl">{name}</p>
        </a>
      </td>

      <td className="font-primary font-medium px-4 sm:px-6 py-4">
        <input
          type="number"
          inputMode="numeric"
          id="variant-quantity"
          name="variant-quantity"
          min="1"
          step="1"
          value={quantity}
          onChange={(e) => {
            onUpdateItem(id, e.target.valueAsNumber);
          }}
          className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-secondary focus:ring-secondary px-1"
        />
      </td>

      <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
        <Price
          num={price * quantity}
          numSize="text-lg"
        />
      </td>
      <td className="font-primary font-medium px-4 sm:px-6 py-4">
        <button
          aria-label="delete-item"
          className="border border-secondary rounded-md border-solid px-2"
          onClick={() => {
            onUpdateItem(id, 0);
          }}
        >
          <i className="fa-solid fa-times text-secondary"></i>
        </button>
      </td>
    </tr>
  );
};

export default ProductInCart;
