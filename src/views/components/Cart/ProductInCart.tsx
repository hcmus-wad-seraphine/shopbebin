import { type CartItem } from "@prisma/client";
import { compareItem, updateCart } from "@utils/cart";
import { appState } from "@views/valtio";
import { type FC } from "react";
import { useSnapshot } from "valtio";

import Price from "../Price";

const ProductInCart: FC<CartItem> = (cardItem) => {
  const profileSnap = useSnapshot(appState).profile;

  if (!profileSnap) return null;

  const handleChangeQuantity = (quantity: number) => {
    let currentCart: CartItem[] = profileSnap.user.cart.map((item) => ({
      ...item,
      toppingIds: item.toppingIds.map((id) => id),
    }));

    if (quantity === 0) {
      currentCart = currentCart.filter((item) => !compareItem(item, cardItem));
    } else {
      currentCart = currentCart.map((item) => {
        if (compareItem(item, cardItem)) {
          return {
            ...item,
            quantity,
          };
        }

        return item;
      });
    }

    updateCart(currentCart, profileSnap.token).catch((err) => {
      console.error(err);
    });
  };

  return (
    <tr className="text-sm sm:text-base text-gray-600 text-center">
      <td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center gap-4">
        <input type="checkbox" />

        <img
          src={cardItem.image}
          alt={cardItem.name}
          height={52}
          width={52}
          className={`rounded-md hidden sm:inline-flex`}
        />

        <a href={`/products/${cardItem.metadataId}`}>
          <p className="pt-1 hover:text-primary font-medium text-xl text-left">{cardItem.name}</p>
          <p className="pt-1 text-slate-500 text-sm text-left">
            Size {cardItem.sizeName}, {cardItem.toppingIds.length}{" "}
            {cardItem.toppingIds.length === 1 ? "topping" : "toppings"}
          </p>
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
          value={cardItem.quantity}
          onChange={(e) => {
            handleChangeQuantity(parseInt(e.target.value) || 1);
          }}
          className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-secondary focus:ring-secondary px-1"
        />
      </td>

      <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
        <Price
          num={cardItem.price * cardItem.quantity}
          numSize="text-lg"
        />
      </td>
      <td className="font-primary font-medium px-4 sm:px-6 py-4">
        <button
          aria-label="delete-item"
          className="border border-secondary rounded-md border-solid px-2"
          onClick={() => {
            handleChangeQuantity(0);
          }}
        >
          <i className="fa-solid fa-times text-secondary"></i>
        </button>
      </td>
    </tr>
  );
};

export default ProductInCart;
