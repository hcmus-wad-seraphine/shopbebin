import { type Order } from "@prisma/client";
import OrderRow from "@views/features/Orders/OrderRow";
import OrderTitleRow from "@views/features/Orders/OrderTitleRow";
import { appState } from "@views/valtio";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${appState.profile?.token}`,
        },
      });
      const data = await res.json();
      setOrders(data.orders);
      setTotal(data.total);
    };

    fetchOrders().catch(console.error);
  }, []);

  const updateOrder = (order: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((prevOrder) => {
        if (prevOrder.id === order.id) {
          return order;
        }
        return prevOrder;
      }),
    );
  };

  return (
    <div className="flex-col gap-2 w-full">
      <OrderTitleRow />

      {orders.map((order) => (
        <OrderRow
          key={order.id}
          order={order}
          updateOrder={updateOrder}
        />
      ))}
    </div>
  );
};

export default OrdersPage;
