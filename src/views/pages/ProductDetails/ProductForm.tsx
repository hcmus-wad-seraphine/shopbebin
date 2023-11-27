import { type Topping } from "@models/interface";
import { type ProductSize } from "@prisma/client";
import Price from "@views/components/Price";
import { useState } from "react";

interface ProductFormProps {
  sizes: ProductSize[];
  toppings: Topping[];
  onChangeSize: (size: ProductSize) => void;
}

const ProductForm = ({ sizes, toppings, onChangeSize }: ProductFormProps) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(sizes[0]);

  function handleSizeChange(event) {
    setSize(event);
    onChangeSize(size);
  }

  const handleAddToCart = async () => {
    console.log("added");
  };

  const updateQuantity = (event) => {
    if (event === "") {
      setQuantity(1);
    } else {
      setQuantity(Math.floor(event));
    }
  };

  return (
    <div className="flex-col w-full gap-5">
      <div className="flex-col gap-10">
        <div className="justify-start space-x-2 w-full">
          <div className="flex flex-col items-start space-y-1 flex-grow-0">
            <label className="text-gray-500 text-base">Qty.</label>
            <input
              type="number"
              inputMode="numeric"
              id="quantity"
              name="quantity"
              min="1"
              step="1"
              value={quantity}
              onChange={(e) => {
                updateQuantity(e.target.value);
              }}
              className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-secondary focus:ring-secondary"
            />
          </div>
          <div className="flex flex-col items-start space-y-1 flex-grow">
            <label className="text-gray-500 text-base">Size</label>
            <select
              id="size-selector"
              name="size-selector"
              onChange={(event) => {
                handleSizeChange(event.target.value);
              }}
              value={size.size}
              className="form-select border border-gray-300 rounded-sm w-full text-gray-900 focus:border-secondary focus:ring-secondary"
            >
              {sizes.map((item) => (
                <option
                  id={item.id}
                  key={item.id}
                  value={item.id}
                >
                  {item.size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-col gap-2">
          <label className="text-gray-500 text-base">Toppings</label>

          <div className="flex-col max-h-[240px] overflow-auto border border-gray-300 p-2 rounded-lg">
            {toppings.map((item) => (
              <div
                key={item.id}
                className="justify-between w-full"
              >
                <div className="gap-2">
                  <img
                    src={item.image}
                    alt=""
                    className="w-8 h-8 rounded-lg"
                  />
                  <div />

                  <div className="flex-col">
                    <p>{item.name}</p>
                    <Price
                      num={item.price}
                      numSize="12"
                    />
                  </div>
                </div>

                <input
                  type="checkbox"
                  id={item.id}
                  name={item.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        className="flex bg-gradient-to-b from-primary to-secondary px-3 py-2 justify-center items-center rounded-full gap-2 text-white "
        aria-label="cart-button"
        onClick={() => handleAddToCart}
      >
        Add To Cart
        <i className="fa-solid fa-shopping-cart"></i>
      </button>
    </div>
  );
};

export default ProductForm;
