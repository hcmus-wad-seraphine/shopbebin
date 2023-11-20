import Price from "../Price";
import { FC } from "react";
import { Product } from "../internal";

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = ({ product }) => {
  const handle = product.id;
  const title = product.name;
  const description = product.description;
  const price = product.price;

  const image = product.thumbnail;

  return (
    <a
      href={`/products/${handle}`}
      className="flex flex-1 justify-center mx-[30px] my-[20px]"
    >
      <a className="h-120 w-72 rounded shadow-lg mx-auto border border-palette-lighter">
        <div className="h-72 border-b-2 border-palette-lighter relative p-2">
          <img
            src={image}
            alt={image}
            className="transform duration-500 ease-in-out hover:scale-110"
          />
        </div>
        <div className="h-48 relative flex-col">
          <div className="font-primary text-palette-primary text-2xl pt-4 px-4 font-semibold">
            {title}
          </div>
          <div className="text-lg text-gray-600 p-4 font-primary font-light">
            {description}
          </div>
          <div
            className="text-black font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-secondary/30 
            rounded-tl-sm triangle"
          >
            <Price num={price} numSize="text-lg" />
          </div>
        </div>
      </a>
    </a>
  );
};

export default ProductCard;
