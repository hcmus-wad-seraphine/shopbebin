import { type Order } from "@prisma/client";
import { addressToString } from "@utils/address";
import { capitalize, convertDateToReadable, shortenProductName } from "@utils/converter";
import { useState } from "react";
import { Link } from "react-router-dom";

import { handleCancel } from "./internal";
import ReviewProduct from "./Review";

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderState, setOrderState] = useState<Order>(order);
  const mainItem = shortenProductName(orderState.cart[0].name);
  const totalItems = orderState.cart.reduce((sum, curr) => sum + curr.quantity, 0);

  return (
    <div className="flex-col w-full max-w-xl border border-gray-400 px-5 py-4 rounded-lg hover:shadow-lg transition">
      <ReviewProduct
        cart={orderState.cart}
        orderId={orderState.id}
        isOpen={isModalOpen}
        onSetOrder={setOrderState}
      />

      <div className="justify-between py-1">
        <p>Order #{orderState.id}</p>
        <p>{convertDateToReadable(new Date(orderState.createdAt))}</p>
      </div>

      <Link
        to={`/orders/${orderState.id}`}
        className="flex gap-5 items-center py-1"
      >
        <img
          src={orderState.cart[0].image}
          alt={orderState.cart[0].name}
          className="w-[60px] h-[60px] object-cover rounded-md"
        />

        <div className="w-full flex-col gap-2">
          <div className="w-full justify-between">
            <p className="text-primary font-medium hover:text-secondary transition">{mainItem}</p>
            <p className="font-medium">({totalItems} items)</p>
          </div>

          <p className="text-gray-500">{addressToString(orderState.shippingAddress)}</p>
          <p className="font-medium">$ {orderState.price}</p>
        </div>
      </Link>

      <div className="justify-between items-center py-1">
        <p className="text-secondary font-medium">{capitalize(orderState.status)}</p>

        <div className="gap-4">
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            disabled={order?.status !== "DELIVERED"}
            className={`bg-${
              orderState.status === "DELIVERED" ? "primary" : "gray-500"
            } text-white font-medium px-4 py-1 rounded-md`}
          >
            Review
          </button>

          <button
            onClick={() => {
              handleCancel(orderState.id, setOrderState);
            }}
            disabled={order?.status !== "ORDERED"}
            className={`bg-${
              orderState.status === "ORDERED" ? "error" : "gray-500"
            } text-white font-medium px-4 py-1 rounded-md`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
