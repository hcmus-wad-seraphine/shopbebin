import CheckoutItem from "@components/Checkout/CheckoutItem";
import Price from "@components/Price";
import { type CartItem } from "@prisma/client";
import ShippingInfo, { type ShippingInfoProps } from "@views/components/Checkout/ShippingInfo";
import NavigateButton from "@views/components/NavigateButton";
import { appState } from "@views/valtio";
import { useState } from "react";
import { useSnapshot } from "valtio";

const Checkout = () => {
  const profileSnap = useSnapshot(appState).profile;

  if (!profileSnap) return null;

  const [shippingInfo, setShippingInfo] = useState<ShippingInfoProps>({
    name: profileSnap.user.name,
    phone: profileSnap.user.phone,
    address: profileSnap.user.addresses[0],
  });

  const items: CartItem[] = profileSnap.user.cart.map((item) => ({
    ...item,
    toppingNames: item.toppingNames.map((name) => name),
  }));

  const total = items.reduce((sum, curr) => sum + curr.price * curr.quantity, 0);

  return (
    <div className="flex-col py-5 items-center">
      <ShippingInfo {...shippingInfo} />

      <h1 className="font-bold text-primary text-xl self-center">YOUR ORDER</h1>

      <div className="flex-col gap-2">
        <div className="flex-col gap-5 h-[500px] overflow-auto py-5 px-10 border border-black rounded-2xl">
          {items.map((item, idx) => (
            <CheckoutItem
              key={idx}
              {...item}
            />
          ))}
        </div>

        <div className="flex-col gap-2">
          <div className="text-xl justify-between">
            <p className="font-semibold uppercase text-primary">Shipping fee</p>
            <Price
              num={10}
              numSize="20"
            />
          </div>

          <div className="text-xl justify-between">
            <p className="font-semibold uppercase text-primary">Total</p>
            <Price
              num={total}
              numSize="20"
            />
          </div>
        </div>

        <div className="self-center">
          <NavigateButton
            style="max-w-[200px] self-center"
            to="/checkout"
          >
            Confirm
          </NavigateButton>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
