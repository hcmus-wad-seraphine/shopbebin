import Container from "@components/Container";
import { orders } from "@views/components/internal";
import OrderCard from "@views/components/Orders/OrderCard";

const Orders = () => {
  return (
    <Container>
      <div className="justify-center items-center flex-col w-full gap-5 py-5">
        <h1 className="text-primary font-bold text-xl uppercase">Your Orders</h1>
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
          />
        ))}
      </div>
    </Container>
  );
};

export default Orders;
