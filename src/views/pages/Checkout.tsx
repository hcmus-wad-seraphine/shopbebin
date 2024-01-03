import CheckoutItem from "@components/Checkout/CheckoutItem";
import Price from "@components/Price";
import { type CartItem, type Order, OrderStatus, PaymentMethod } from "@prisma/client";
import { cleanCart } from "@utils/cart";
import { generateMongoObjectId } from "@utils/objectId";
import ShippingInfo, { type ShippingInfoProps } from "@views/components/Checkout/ShippingInfo";
import InlineLoading from "@views/components/InlineLoading";
import { appState } from "@views/valtio";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";

const Checkout = () => {
  const profileSnap = useSnapshot(appState).profile;

  if (!profileSnap) return null;

  const [vnpayCheckoutUrl, setVnpayCheckoutUrl] = useState("");

  const [shippingInfo, setShippingInfo] = useState<ShippingInfoProps>({
    name: profileSnap.user.name,
    phone: profileSnap.user.phone,
    address: profileSnap.user.addresses[0],
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.COD);

  const shippingFee = 10;

  const items: CartItem[] = profileSnap.user.cart.map((item) => ({
    ...item,
    toppingNames: item.toppingNames.map((name) => name),
  }));

  const total = items.reduce((sum, curr) => sum + curr.price * curr.quantity, 0) + shippingFee;

  const orderId = generateMongoObjectId();

  const order: Order = {
    id: orderId,
    cart: items,
    userId: profileSnap.user.id,
    shippingAddress: shippingInfo.address,
    status: OrderStatus.ORDERED,
    price: total,
    paymentMethod,
    reviewId: null,
    createdAt: new Date(),
  };

  useEffect(() => {
    const checkout = async () => {
      const data = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${profileSnap.token}`,
        },
        body: JSON.stringify(order),
      });

      const { url } = await data.json();

      setVnpayCheckoutUrl(url);
    };

    checkout().catch((err) => {
      console.error("[ERROR] Checkout", err);
    });
  }, []);

  const handleCheckout = () => {
    const makeOrder = async (order: Order) => {
      await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${profileSnap.token}`,
        },
        body: JSON.stringify({ order }),
      });

      // No need to wait for this
      cleanCart(profileSnap.token).catch((err) => {
        console.error("[ERROR] Clean cart", err);
      });

      // Not use navigate because we may need to redirect to VNPAY checkout page
      window.location.href = paymentMethod === PaymentMethod.COD ? "/orders" : vnpayCheckoutUrl;
    };

    makeOrder(order).catch((err) => {
      console.error("[ERROR] Make order", err);
    });
  };

  return (
    <div className="flex-col py-5 items-center gap-8">
      <ShippingInfo {...shippingInfo} />

      <div className="justify-between w-full max-w-3xl px-8">
        <p className="text-primary uppercase font-semibold text-xl">Payment method</p>

        <select
          className="form-select border w-40 border-gray-300 rounded-sm text-gray-900 focus:border-secondary focus:ring-secondary"
          value={paymentMethod}
          onChange={(e) => {
            setPaymentMethod(e.target.value as PaymentMethod);
          }}
        >
          <option value={PaymentMethod.COD}>COD</option>
          <option value={PaymentMethod.INTERNET_BANKING}>Internal Banking</option>
        </select>
      </div>

      <div className="flex-col gap-2">
        <h1 className="font-bold text-primary text-xl self-center">YOUR ORDER</h1>

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
              num={shippingFee}
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

        {vnpayCheckoutUrl === "" ? (
          <InlineLoading />
        ) : (
          <button
            className="w-fit mx-auto bg-gradient-to-b from-primary to-secondary px-3 py-2 rounded-full gap-2 text-white"
            onClick={handleCheckout}
          >
            Confirm
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
