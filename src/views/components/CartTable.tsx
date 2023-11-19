import { useState, useEffect, FC } from "react";
// import { useUpdateCartQuantityContext } from "@/context/Store";
import Price from "./Price";
// import { getCartSubTotal } from "@/utils/helpers";
import { Product } from "./internal";

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
    <div className="min-h-80 max-w-2xl my-4 sm:my-8 mx-auto w-full">
      <table className="mx-auto">
        <thead>
          <tr className="uppercase text-xs sm:text-sm text-palette-primary border-b border-palette-light">
            <th className="font-primary font-normal px-6 py-4">Product</th>
            <th className="font-primary font-normal px-6 py-4">Quantity</th>
            <th className="font-primary font-normal px-6 py-4 hidden sm:table-cell">
              Price
            </th>
            <th className="font-primary font-normal px-6 py-4">Remove</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-palette-lighter">
          {products.map((item) => (
            <tr
              key={item.id}
              className="text-sm sm:text-base text-gray-600 text-center"
            >
              <td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center">
                <img
                  src={item.thumbnail}
                  alt={item.thumbnail}
                  height={40}
                  width={40}
                  className={`hidden sm:inline-flex`}
                />
                <a href={`/products/${item.id}`}>
                  <a className="pt-1 hover:text-palette-dark">{item.name}</a>
                </a>
              </td>
              <td className="font-primary font-medium px-4 sm:px-6 py-4">
                <input
                  type="number"
                  inputMode="numeric"
                  id="variant-quantity"
                  name="variant-quantity"
                  min="1"
                  step="1"
                  value={item.stock}
                  onChange={(e) => updateItem(item.id, e.target.valueAsNumber)}
                  className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
                />
              </td>
              <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
                <Price num={item.price} numSize="text-lg" />
              </td>
              <td className="font-primary font-medium px-4 sm:px-6 py-4">
                <button
                  aria-label="delete-item"
                  className=""
                  onClick={() => updateItem(item.id, 0)}
                >
                  <i className="fa-solid fa-times"></i>
                </button>
              </td>
            </tr>
          ))}
          {subtotal === 0 ? null : (
            <tr className="text-center">
              <td></td>
              <td className="font-primary text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4">
                Subtotal
              </td>
              <td className="font-primary text-lg text-palette-primary font-medium px-4 sm:px-6 py-4">
                <Price num={subtotal} numSize="text-xl" />
              </td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
