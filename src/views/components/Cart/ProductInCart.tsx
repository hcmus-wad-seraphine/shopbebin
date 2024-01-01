import { type CartItem } from "@prisma/client";
import { compareCartItems, updateCart } from "@utils/cart";
import { appState } from "@views/valtio";
import { type FC } from "react";
import { useSnapshot } from "valtio";

import Price from "../Price";

const ProductInCart: FC<CartItem> = (cartItem) => {
  const profileSnap = useSnapshot(appState).profile;

  if (!profileSnap) return null;

  const handleChangeQuantity = (quantity: number) => {
    let currentCart: CartItem[] = profileSnap.user.cart.map((item) => ({
      ...item,
      toppingNames: item.toppingNames.map((name) => name),
    }));

    if (quantity === 0) {
      currentCart = currentCart.filter((item) => !compareCartItems(item, cartItem));
    } else {
      currentCart = currentCart.map((item) => {
        if (compareCartItems(item, cartItem)) {
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
        <img
          src={cartItem.image}
          alt={cartItem.name}
          height={52}
          width={52}
          className={`rounded-md hidden sm:inline-flex`}
        />

        <a href={`/products/${cartItem.metadataId}`}>
          <p className="pt-1 hover:text-primary font-medium text-xl text-left">{cartItem.name}</p>
          <p className="pt-1 text-slate-500 text-sm text-left">Size: {cartItem.sizeName}</p>
          <p className="pt-1 text-slate-500 text-sm text-left">
            Topping: {cartItem.toppingNames.length > 0 ? cartItem.toppingNames.join(", ") : "None"}
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
          value={cartItem.quantity}
          onChange={(e) => {
            handleChangeQuantity(parseInt(e.target.value) || 1);
          }}
          className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-secondary focus:ring-secondary px-1"
        />
      </td>

      <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
        <Price
          num={cartItem.price * cartItem.quantity}
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
