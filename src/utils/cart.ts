import { type CartItem } from "@prisma/client";
import { appActions } from "@views/valtio";

export const updateCart = async (cart: CartItem[], jwt: string) => {
  const res = await fetch("/api/profile/update-cart", {
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      cart,
    }),
  });

  if (res.ok) {
    appActions.updateCart(cart);
  }
};

export const compareCartItems = (item1: CartItem, item2: CartItem) => {
  if (item1.sizeName !== item2.sizeName) return false;
  if (item1.toppingNames.length !== item2.toppingNames.length) return false;

  for (let i = 0; i < item1.toppingNames.length; i++) {
    if (item1.toppingNames[i] !== item2.toppingNames[i]) return false;
  }

  return true;
};
