import { type Order, OrderStatus } from "@prisma/client";
import Pagination from "@views/components/Pagination";
import Title from "@views/components/Title";
import OrderRow from "@views/features/Orders/OrderRow";
import OrderTitleRow from "@views/features/Orders/OrderTitleRow";
import { appState } from "@views/valtio";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL");
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const limit = 10;

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  useEffect(() => {
    const fetchOrders = async () => {
      let endpoint = `/api/orders?offset=${offset}&limit=${limit}`;
      if (statusFilter !== "ALL") {
        endpoint += `&status=${statusFilter}`;
      }
      if (dateFilter) {
        endpoint += `&date=${dateFilter.toISOString()}`;
      }

      const res = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${appState.profile?.token}`,
        },
      });

      const data = await res.json();
      setOrders(data.orders);
      setTotal(data.total);
    };

    fetchOrders().catch(console.error);
  }, [limit, offset, statusFilter, dateFilter]);

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
    <div className="flex-col gap-4 w-full">
      <Title text="Orders" />

      <div className="flex-row items-center gap-4">
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as OrderStatus | "ALL");
          }}
        >
          <option value="ALL">All</option>

          {Object.values(OrderStatus).map((status) => (
            <option
              key={status}
              value={status}
            >
              {status.slice(0, 1).toUpperCase() + status.slice(1).toLowerCase()}
            </option>
          ))}
        </select>

        <input
          className="px-2 py-1 border border-gray-300 rounded-md"
          type="date"
          value={dateFilter ? dateFilter.toISOString().slice(0, 10) : ""}
          onChange={(e) => {
            if (!e.target.value) {
              setDateFilter(null);
              return;
            }
            setDateFilter(new Date(e.target.value));
          }}
        />
      </div>

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
