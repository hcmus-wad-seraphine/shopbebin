import { type ShopbebinProduct, type ShopbebinTopping } from "@models/interface";
import { type CartItem, type ProductSize } from "@prisma/client";
import { appActions, appState } from "@views/valtio";
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

  const updateCart = async (cart: CartItem[]) => {
    if (!profileSnap) return;

    const res = await fetch("/api/profile/update-cart", {
      headers: {
        Authorization: `Bearer ${profileSnap.token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        cart,
      }),
    });

    if (res.ok) {
      appActions.updateUserCart(cart);
    }
  };

  const handleAddToCart = () => {
    if (!profileSnap) return;

    const cartItem: CartItem = {
      name: product.name,
      image: product.images[0],
      price: totalPrice,
      metadataId: product.id,
      sizeId: size.id,
      toppingIds: selectedToppings.map((topping) => topping.id),
      quantity,
    };

    const currentCart = profileSnap.user.cart.map((item) => ({
      ...item,
      toppingIds: item.toppingIds.map((id) => id),
    }));

    const newCart = [...currentCart, cartItem];
    updateCart(newCart).catch((err) => {
      console.error(err);
    });
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
