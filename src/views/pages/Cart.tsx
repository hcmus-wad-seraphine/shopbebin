import CartTable from "@components/Cart/CartTable";
import { products } from "@components/internal";
import NavigateButton from "@components/NavigateButton";

const CartPage = () => {
  const cart = products;

  return (
    <div className="container mx-auto mb-20 min-h-screen flex-col py-10">
      <h1 className="font-bold text-primary text-2xl self-center">YOUR CART</h1>
      <CartTable cart={cart} />

      <NavigateButton
        style="max-w-[200px] self-center"
        to="/checkout"
      >
        <i className="fa-solid fa-money-check"></i>
        <p>Check out</p>
      </NavigateButton>
    </div>
  );
};

export default CartPage;
