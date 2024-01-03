import { type Order } from "@prisma/client";
import { addressToString } from "@utils/address";
import { capitalize, convertDateToReadable } from "@utils/converter";
import { Link } from "react-router-dom";

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const shortenProductName = (name: string) => {
    if (name.length > 20) {
      return name.slice(0, 20) + "...";
    }

    return name;
  };

  const mainItem = shortenProductName(order.cart[0].name);
  const totalItems = order.cart.reduce((sum, curr) => sum + curr.quantity, 0);

  return (
    <div className="flex-col w-full max-w-xl border border-gray-400 px-5 py-4 rounded-lg hover:shadow-lg transition">
      <div className="justify-between py-1">
        <p>Order #{order.id}</p>
        <p>{convertDateToReadable(new Date(order.createdAt))}</p>
      </div>

      <Link
        to={`/orders/${order.id}`}
        className="flex gap-5 items-center py-1"
      >
        <img
          src={order.cart[0].image}
          alt={order.cart[0].name}
          className="w-[60px] h-[60px] object-cover rounded-md"
        />

        <div className="w-full flex-col gap-2">
          <div className="w-full justify-between">
            <p className="text-primary font-medium hover:text-secondary transition">{mainItem}</p>
            <p className="font-medium">({totalItems} items)</p>
          </div>

          <p className="text-gray-500">{addressToString(order.shippingAddress)}</p>
          <p className="font-medium">$ {order.price}</p>
        </div>
      </Link>

      <div className="justify-between items-center py-1">
        <p className="text-secondary font-medium">{capitalize(order.status)}</p>

        <div className="gap-4">
          <Link
            to={`/orders/${order.id}/rate`}
            className={`bg-${
              order.status === "DELIVERED" ? "primary" : "gray-500"
            } text-white font-medium px-4 py-1 rounded-md hover:bg-secondary transition`}
          >
            Review
          </Link>

          <button
            to={`/orders/${order.id}/rate`}
            className={`bg-${
              order.status === "ORDERED" ? "error" : "gray-500"
            } text-white font-medium px-4 py-1 rounded-md hover:bg-secondary transition`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
