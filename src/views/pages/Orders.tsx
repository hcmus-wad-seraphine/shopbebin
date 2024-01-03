import { type Order } from "@prisma/client";
import OrderCard from "@views/components/Orders/OrderCard";
import { appState } from "@views/valtio";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const profileSnap = useSnapshot(appState).profile;

  if (!profileSnap) return null;

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${profileSnap.token}`,
        },
      });

      const orders = await data.json();

      setOrders(orders);
    };

    fetchOrders().catch(console.error);
  }, []);

  return (
    <div className="justify-center items-center flex-col w-full gap-5 py-5">
      <h1 className="text-primary font-bold text-xl uppercase">Your Orders</h1>

      {orders.length === 0 && <p className="text-gray-500">You have no orders yet.</p>}

      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
        />
      ))}
    </div>
  );
};

export default Orders;
