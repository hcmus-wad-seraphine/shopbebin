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

export const compareItem = (item1: CartItem, item2: CartItem) => {
  if (item1.metadataId !== item2.metadataId) return false;
  if (item1.sizeId !== item2.sizeId) return false;
  if (item1.toppingIds.length !== item2.toppingIds.length) return false;

  for (let i = 0; i < item1.toppingIds.length; i++) {
    if (item1.toppingIds[i] !== item2.toppingIds[i]) return false;
  }

  return true;
};
