import { type ShopbebinProduct, type ShopbebinTopping } from "@models/interface";
import { type CartItem, type ProductSize } from "@prisma/client";
import { compareCartItems, updateCart } from "@utils/cart";
import { appState } from "@views/valtio";
import { useState } from "react";
import { useSnapshot } from "valtio";

import ProductInfo from "./ProductInfo";
import QuantityDetail from "./QuantityDetail";
import SizeDetail from "./SizeDetail";
import ToppingDetail from "./ToppingDetail";

const DetailsFeature = (product: ShopbebinProduct) => {
  const profileSnap = useSnapshot(appState).profile;
  const [size, setSize] = useState<ProductSize>(product.availableSizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState<ShopbebinTopping[]>([]);

  const totalPrice =
    size.price + selectedToppings.reduce((sum, curr) => sum + curr.topping.price, 0);

  const handleAddToCart = () => {
    if (!profileSnap) return;

    const cartItem: CartItem = {
      name: product.name,
      image: product.images[0],
      price: totalPrice,
      metadataId: product.id,
      sizeName: size.size,
      toppingNames: selectedToppings.map((toppingItem) => toppingItem.topping.name),
      quantity,
    };

    const currentCart = profileSnap.user.cart.map((item) => ({
      ...item,
      toppingNames: item.toppingNames.map((id) => id),
    }));

    const existedItem = currentCart.find((item) => compareCartItems(item, cartItem));

    let newCart: CartItem[] = [];

    if (existedItem) {
      newCart = currentCart.map((item) => {
        if (compareCartItems(item, cartItem)) {
          return {
            ...item,
            quantity: item.quantity + cartItem.quantity,
          };
        }

        return item;
      });
    } else {
      newCart = [...currentCart, cartItem];
    }

    updateCart(newCart, profileSnap.token).catch((err) => {
      console.error(err);
    });
  };

  return (
    <div className="flex-1 flex-col justify-start h-full w-full mx-auto space-y-4 min-h-128">
      <ProductInfo
        name={product.name}
        desc={product.desc}
        price={product.basePrice}
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
