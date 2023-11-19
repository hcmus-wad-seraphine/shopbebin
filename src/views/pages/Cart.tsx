import Button from "../components/Button";
import CartTable from "../components/CartTable";
import { products } from "../components/internal";

const CartPage = () => {
  //   const pageTitle = `Cart | ${process.env.siteTitle}`;
  const cart = products;

  return (
    <div className="container mx-auto mb-20 min-h-screen flex-col">
      <CartTable cart={cart} />
      {/* <div className="max-w-sm mx-auto space-y-4 px-2">
        <CheckOutButton webUrl={checkoutUrl} />
        <BackToProductButton />
      </div> */}

      <Button href="/checkout" style="max-w-[200px]">
        <i className="fa-solid fa-money-check"></i>
        <p>Check out</p>
      </Button>
    </div>
  );
};

export default CartPage;
