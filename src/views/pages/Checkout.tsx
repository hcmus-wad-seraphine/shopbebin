import CheckoutItem from "@components/Checkout/CheckoutItem";
import { products } from "@components/internal";
import Price from "@components/Price";
import ShippingInfo from "@views/components/Checkout/ShippingInfo";
import NavigateButton from "@views/components/NavigateButton";

const Checkout = () => {
  const total = products.slice(0, 5).reduce((accumulator, currentValue) => accumulator + 10, 10);

  return (
    <div className="flex-col py-5 items-center">
      <ShippingInfo />
      <h1 className="font-bold text-primary text-xl self-center">YOUR GOODS</h1>
      <div className="flex-col gap-2">
        <div className="flex-col gap-5 h-[500px] overflow-auto py-5 px-10 border border-black rounded-2xl">
          {products.slice(0, 5).map((product) => (
            <CheckoutItem
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <div className="flex-col gap-2">
          <div className="text-xl justify-between">
            <p className="font-semibold uppercase text-primary">Shipping fee</p>
            <Price
              num={10}
              numSize="20"
            />
          </div>

          <div className="text-xl justify-between">
            <p className="font-semibold uppercase text-primary">Total</p>
            <Price
              num={total}
              numSize="20"
            />
          </div>
        </div>

        <div className="self-center">
          <NavigateButton
            style="max-w-[200px] self-center"
            to="/checkout"
          >
            Confirm
          </NavigateButton>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
