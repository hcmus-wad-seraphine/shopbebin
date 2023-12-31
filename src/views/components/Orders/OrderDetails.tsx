import { type Order } from "@prisma/client";
import { addressToString } from "@utils/address";
import { capitalize, convertDateToReadable } from "@utils/converter";
import { appState } from "@views/valtio";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSnapshot } from "valtio";

import CheckoutItem from "../Checkout/CheckoutItem";
import InfoItem from "../Checkout/InfoItem";
import InlineLoading from "../InlineLoading";
import Loading from "../Loading";
import { handleCancel } from "./internal";
import ReviewProduct from "./Review";
import Status from "./Status";

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const profileSnap = useSnapshot(appState).profile;

  if (!profileSnap) return null;

  useEffect(() => {
    const fetchOrder = async () => {
      const orderData = await fetch(`/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${profileSnap.token}`,
          "Content-Type": "application/json",
        },
      });
      const order: Order = await orderData.json();

      setOrder(order);
    };

    fetchOrder().catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div className="flex-col max-w-3xl self-center">
      {order && (
        <ReviewProduct
          orderId={order.id}
          cart={order?.cart}
          isOpen={isModalOpen}
        />
      )}
      <div className="w-full justify-between mt-5">
        <h1 className="font-medium">Order #{id}</h1>
        <p className="text-primary font-medium">
          {order ? convertDateToReadable(new Date(order.createdAt)) : <InlineLoading />}
        </p>
      </div>

      <div className="bg-primary w-full h-[1px] my-5"></div>

      <div className="flex-col">
        <InfoItem
          title="Name"
          value={profileSnap.user.name}
        />
        <InfoItem
          title="Phone number"
          value={profileSnap.user.phone}
        />{" "}
        <InfoItem
          title="Shipping address"
          value={order ? addressToString(order?.shippingAddress) : ""}
        />
        <InfoItem
          title="Payment method"
          value={order ? capitalize(order.paymentMethod) : ""}
        />
      </div>

      <div className="bg-primary w-full h-[1px] my-5"></div>

      {order && <Status status={order.status} />}

      <div className="bg-primary w-full h-[1px] my-5"></div>

      <div className="flex-col w-full justify-center items-center">
        {order ? (
          order.cart.map((item, index) => (
            <CheckoutItem
              key={index}
              {...item}
            />
          ))
        ) : (
          <Loading />
        )}
      </div>

      <div className="bg-primary w-full h-[1px] my-5"></div>

      <InfoItem
        title="Shipping fee"
        value="$ 10"
      />
      <InfoItem
        title="Total"
        value={order ? `$ ${order.price}` : ""}
      />

      <div className="bg-primary w-full h-[1px] my-5"></div>

      <div className="gap-4">
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className={`bg-${
            order?.status === "DELIVERED" ? "primary" : "gray-500"
          } text-white font-medium px-4 py-1 rounded-md flex flex-1 items-center justify-center`}
        >
          Review
        </button>

        <button
          onClick={() => {
            handleCancel(id ?? "", setOrder);
          }}
          disabled={order?.status !== "ORDERED"}
          className={`bg-${
            order?.status === "ORDERED" ? "error" : "gray-500"
          } text-white font-medium px-4 py-1 rounded-md flex flex-1 items-center justify-center`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
