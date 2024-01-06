import { type Order, OrderStatus } from "@prisma/client";
import { addressToString } from "@utils/address";
import { shortenId } from "@utils/converter";
import { type FC } from "react";

interface OrderRowProps {
  order: Order;
}

const OrderRow: FC<OrderRowProps> = ({ order }) => {
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
