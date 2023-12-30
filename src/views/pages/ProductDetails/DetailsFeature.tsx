import { type Product, type Topping } from "@models/interface";
import { type ProductSize } from "@prisma/client";
import { useState } from "react";

import ProductInfo from "./ProductInfo";
import QuantityDetail from "./QuantityDetail";
import SizeDetail from "./SizeDetail";
import ToppingDetail from "./ToppingDetail";

const DetailsFeature = (product: Product) => {
  const [size, setSize] = useState<ProductSize>(product.availableSizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

  const totalPrice =
    size.price + selectedToppings.reduce((sum, curr) => sum + curr.topping.price, 0);

  const handleAddToCart = () => {
    console.log("added", size, quantity, selectedToppings);
  };

  return (
    <div className="flex-1 flex-col justify-start h-full w-full mx-auto space-y-4 min-h-128">
      <ProductInfo
        name={product.name}
        desc={product.desc}
        price={size.price}
      />

      <div className="justify-start space-x-2 w-full">
        <QuantityDetail
          quantity={quantity}
          setQuantity={setQuantity}
        />

        <SizeDetail
          sizes={product.availableSizes}
          size={size}
          onChangeSize={setSize}
        />
      </div>

      <ToppingDetail
        toppings={product.availableToppings}
        selectedToppings={selectedToppings}
        setSelectedToppings={setSelectedToppings}
      />

      <p>Total: $ {totalPrice}</p>

      <button
        className="flex bg-gradient-to-b from-primary to-secondary px-3 py-2 justify-center items-center rounded-full gap-2 text-white max-w-[280px]"
        aria-label="cart-button"
        onClick={handleAddToCart}
      >
        Add To Cart
        <i className="fa-solid fa-shopping-cart"></i>
      </button>
    </div>
  );
};

export default DetailsFeature;
