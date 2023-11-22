import { type FC } from "react";
import Price from "../Price";
import { type ProductMetadata } from "@prisma/client";

interface Props {
  onUpdateItem: (id: string, quantity: number) => void;
  item: ProductMetadata;
}

const ProductInCart: FC<Props> = ({ onUpdateItem, item }) => {
  return (
    <tr
      key={item.id}
      className="text-sm sm:text-base text-gray-600 text-center"
    >
      <td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center gap-4">
        <input type="checkbox" />

        <img
          src={item.images[0]}
          alt={item.images[0]}
          height={52}
          width={52}
          className={`rounded-md hidden sm:inline-flex`}
        />

        <a href={`/products/${item.id}`}>
          <a className="pt-1 hover:text-primary font-medium text-xl">{item.name}</a>
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
          value={1}
          onChange={(e) => {
            onUpdateItem(item.id, e.target.valueAsNumber);
          }}
          className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-secondary focus:ring-secondary"
        />
      </td>

      <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
        <Price
          num={10}
          numSize="text-lg"
        />
      </td>
      <td className="font-primary font-medium px-4 sm:px-6 py-4">
        <button
          aria-label="delete-item"
          className="border border-secondary rounded-md border-solid px-2"
          onClick={() => {
            onUpdateItem(item.id, 0);
          }}
        >
          <i className="fa-solid fa-times text-secondary"></i>
        </button>
      </td>
    </tr>
  );
};

export default ProductInCart;
