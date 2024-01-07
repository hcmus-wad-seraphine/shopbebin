import { type Order, OrderStatus } from "@prisma/client";
import { addressToString } from "@utils/address";
import { cartToReadableContent, shortenId } from "@utils/converter";
import { ModalHeader, modalStyles } from "@views/components/Modal";
import { appState } from "@views/valtio";
import { type ChangeEvent, type FC, useState } from "react";
import Modal from "react-modal";

interface OrderRowProps {
  order: Order;
  updateOrder: (order: Order) => void;
}

const OrderRow: FC<OrderRowProps> = ({ order, updateOrder }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
    <>
      <div className="grid grid-cols-12 gap-4 whitespace-pre-wrap">
        <div className="col-span-1">
          <button
            className="rounded-md p-2 bg-primary text-white hover:bg-secondary h-fit transition"
            onClick={openModal}
          >
            View
          </button>
        </div>
        <div className="col-span-1">{shortenId(order.id)}</div>
        <div className="col-span-1">{shortenId(order.userId)}</div>
        <div className="col-span-1">{order.price}</div>
        <div className="col-span-2">{addressToString(order.shippingAddress)}</div>
        <div className="col-span-2">{order.paymentMethod}</div>
        <div className="col-span-2">{new Date(order.createdAt).toLocaleString()}</div>
        <div className="col-span-2">
          <select
            className="h-fit"
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Order Detail"
      >
        <ModalHeader
          title={`Order Detail`}
          closeModal={closeModal}
        />
        {cartToReadableContent(order.cart).map((content) => (
          <p key={content}>{content}</p>
        ))}
      </Modal>
    </>
  );
};

export default OrderRow;
