import { useState, useEffect, FC } from "react";
// import { useUpdateCartQuantityContext } from "@/context/Store";
import Price from "../Price";
// import { getCartSubTotal } from "@/utils/helpers";
import { Product } from "../internal";
import ProductInCart from "./ProductInCart";

interface Props {
  cart: Product[];
}

const CartTable: FC<Props> = ({ cart }) => {
  //   const updateCartQuantity = useUpdateCartQuantityContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    setProducts(cart);
    setSubtotal(100);
  }, [cart]);

  const updateItem = (id: string, stock: number) => {
    // updateCartQuantity(id, stock);
    console.log(id, stock);
  };

  return (
    <div className="min-h-80 max-w-3xl my-4 sm:my-8 mx-auto w-full">
      <table className="w-full">
        <thead>
          <tr className="uppercase text-xs sm:text-sm text-palette-primary border-b border-palette-light">
            <th className="font-primary text-secondary text-xl font-bold px-6 py-4">
              Product
            </th>
            <th className="font-primary text-secondary text-xl font-bold px-6 py-4">
              Quantity
            </th>
            <th className="font-primary text-secondary text-xl font-bold px-6 py-4 hidden sm:table-cell">
              Price
            </th>
            <th className="font-primary text-secondary text-xl font-bold px-6 py-4">
              Remove
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-palette-lighter">
          {products.map((item) => (
            <ProductInCart
              key={item.id}
              item={item}
              onUpdateItem={updateItem}
            />
          ))}
          {subtotal === 0 ? null : (
            <tr>
              <td className="text-xl font-primary text-base font-semibold text-primary uppercase px-4 sm:px-6 py-4">
                Subtotal
              </td>
              <td></td>
              <td></td>

              <td className="font-primary text-end text-lg text-palette-primary font-medium px-4 sm:px-6 py-4">
                <Price num={subtotal} numSize="text-xl" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
