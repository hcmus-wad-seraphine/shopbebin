import CartTable from "@components/Cart/CartTable";
import NavigateButton from "@components/NavigateButton";
import { appState } from "@views/valtio";
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";

const CartPage = () => {
  const profileSnap = useSnapshot(appState).profile;

  if (!profileSnap) return null;

  return (
    <div className="container mx-auto mb-20 min-h-screen flex-col py-10">
      <h1 className="font-bold text-primary text-2xl self-center">YOUR CART</h1>

      {profileSnap.user.cart.length === 0 ? (
        <p className="mt-8 text-gray-500 text-center">
          Your cart is empty.{" "}
          <Link
            to={"/"}
            className="text-primary hover:text-secondary transition"
          >
            Go shopping
          </Link>
        </p>
      ) : (
        <>
          <CartTable />

          <NavigateButton
            style="max-w-[200px] self-center"
            to="/checkout"
          >
            <i className="fa-solid fa-money-check"></i>
            <p>Check out</p>
          </NavigateButton>
        </>
      )}
    </div>
  );
};

export default CartPage;
