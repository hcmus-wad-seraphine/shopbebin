import { type Order, OrderStatus } from "@prisma/client";

import { appState } from "./../../valtio/index";

export const handleCancel = (id: string, setOrder?: (order: Order) => void) => {
  const cancel = async () => {
    const response = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${appState.profile?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: OrderStatus.CANCELLED }),
    });

    const updatedOrder: Order = await response.json();

    setOrder && setOrder(updatedOrder);
  };

  cancel().catch((err) => {
    console.log(err);
  });
};
