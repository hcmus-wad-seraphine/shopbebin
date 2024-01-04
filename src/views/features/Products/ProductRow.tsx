import { type ShopbebinProduct, type ShopbebinTopping } from "@models/interface";
import { type ProductSize } from "@prisma/client";
import { type FC } from "react";

interface ProductRowProps {
  product: ShopbebinProduct;
}

const shortenId = (id: string) => {
  return id.slice(0, 4) + "..." + id.slice(-4);
};

const sizesToString = (sizes: ProductSize[]) => {
  if (sizes.length === 0) {
    return "None";
  }
  return sizes.map((size) => `${size.size}`).join(", ");
};

const toppingsToString = (toppings: ShopbebinTopping[]) => {
  if (toppings.length === 0) {
    return "None";
  }
  return toppings.map((topping) => `${topping.topping.name}`).join(", ");
};

const ProductRow: FC<ProductRowProps> = ({ product }) => {
  return (
    <div className="grid grid-cols-12 gap-4 whitespace-pre-wrap">
      <div className="col-span-1">{shortenId(product.id)}</div>
      <div className="col-span-1">
        <img
          className="w-12 h-12 object-cover"
          src={product.images[0]}
          alt={product.name}
        />
      </div>
      <div className="col-span-2">{product.name}</div>
      <div className="col-span-1">{product.basePrice}</div>
      <div className="col-span-1">{product.category}</div>
      <div className="col-span-1">{sizesToString(product.availableSizes)}</div>
      <div className="col-span-2">{toppingsToString(product.availableToppings)}</div>
      <div className="col-span-3 flex items-center gap-2">
        <i className="fa-solid fa-pen-to-square"></i>
        <i className="fa-solid fa-trash"></i>
      </div>
    </div>
  );
};

export default ProductRow;
