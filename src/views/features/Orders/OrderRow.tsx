import { type Order, OrderStatus } from "@prisma/client";
import { addressToString } from "@utils/address";
import { shortenId } from "@utils/converter";
import { appState } from "@views/valtio";
import { type ChangeEvent, type FC } from "react";

interface OrderRowProps {
  order: Order;
  updateOrder: (order: Order) => void;
}

const OrderRow: FC<OrderRowProps> = ({ order, updateOrder }) => {
  const handleChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as OrderStatus;

    fetch(`/api/orders/${order.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${appState.profile?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(async (res) => {
        const updatedOrder = await res.json();
        updateOrder(updatedOrder);
      })
      .catch(console.error);
  };

  return (
    <div className="grid grid-cols-12 gap-4 whitespace-pre-wrap">
      <div className="col-span-1">{shortenId(order.id)}</div>
      <div className="col-span-1">{shortenId(order.userId)}</div>
      <div className="col-span-1">{order.price}</div>
      <div className="col-span-3 pr-4">{addressToString(order.shippingAddress)}</div>
      <div className="col-span-2">{order.paymentMethod}</div>
      <div className="col-span-2">{new Date(order.createdAt).toLocaleString()}</div>
      <div className="col-span-2">
        <select
          className="select"
          value={order.status}
          onChange={handleChangeStatus}
        >
          {Object.values(OrderStatus).map((status) => (
            <option
              value={status}
              key={status}
            >
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default OrderRow;
