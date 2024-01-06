import { type Order } from "@prisma/client";
import Pagination from "@views/components/Pagination";
import OrderRow from "@views/features/Orders/OrderRow";
import OrderTitleRow from "@views/features/Orders/OrderTitleRow";
import { appState } from "@views/valtio";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(`/api/orders?offset=${offset}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${appState.profile?.token}`,
        },
      });
      const data = await res.json();
      setOrders(data.orders);
      setTotal(data.total);
    };

    fetchOrders().catch(console.error);
  }, [limit, offset]);

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

      <Pagination
        currentPage={currentPage}
        limit={limit}
        total={totalPages}
        onGoToPage={(page) => {
          setOffset((page - 1) * limit);
        }}
      />
    </div>
  );
};

export default OrdersPage;
