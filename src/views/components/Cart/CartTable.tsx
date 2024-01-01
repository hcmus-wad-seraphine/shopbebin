import { type CartItem } from "@prisma/client";
import { appState } from "@views/valtio";
import { useSnapshot } from "valtio";

import Price from "../Price";
import ProductInCart from "./ProductInCart";

const CartTable = () => {
  const profileSnap = useSnapshot(appState).profile;

  if (!profileSnap) return null;

  const items: CartItem[] = profileSnap.user.cart.map((item) => ({
    ...item,
    toppingNames: item.toppingNames.map((name) => name),
  }));

  const total = items.reduce((sum, curr) => sum + curr.price * curr.quantity, 0);

  return (
    <div className="min-h-80 max-w-3xl my-4 sm:my-8 mx-auto w-full">
      <table className="w-full">
        <thead>
          <tr className="uppercase text-xs sm:text-sm text-palette-primary border-b border-palette-light">
            <th className="font-primary text-secondary text-xl font-bold px-6 py-4">Product</th>
            <th className="font-primary text-secondary text-xl font-bold px-6 py-4">Quantity</th>
            <th className="font-primary text-secondary text-xl font-bold px-6 py-4 hidden sm:table-cell">
              Price
            </th>
            <th className="font-primary text-secondary text-xl font-bold px-6 py-4">Remove</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-palette-lighter">
          {items.map((item, idx) => (
            <ProductInCart
              key={idx}
              {...item}
            />
          ))}

          {total === 0 ? null : (
            <tr>
              <td className="text-xl font-primary font-semibold text-primary uppercase px-4 sm:px-6 py-4">
                Total
              </td>
              <td></td>
              <td></td>

              <td className="font-primary text-end text-lg text-palette-primary font-medium px-4 sm:px-6 py-4">
                <Price
                  num={total}
                  numSize="text-xl"
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
