import { type ProductMetadata } from "@prisma/client";
import { type FC } from "react";
import { Link } from "react-router-dom";

import ProductCard from "./ProductCard";

interface Props {
  products: ProductMetadata[];
  pageNumber: number;
}

const ProductsDisplay: FC<Props> = ({ products, pageNumber }) => {
  const numberOfPages = Math.ceil(products.length / 9);
  const pages = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex-col items-center">
      <div className="w-full  items-center flex-wrap px-10 py-10">
        {products.slice((pageNumber - 1) * 9, pageNumber * 9).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      <div className="items-center gap-1 justify-center">
        <div className="bg-secondary/80 px-4 py-2 rounded-md">
          <i className="fa-solid fa-play fa-rotate-180"></i>
        </div>
        <div className="gap-1">
          {pages.map((page) => (
            <Link
              key={page.toString()}
              className="bg-secondary/50 w-8 h-8 flex justify-center items-center rounded-2xl"
              to={`/?page=${page}`}
            >
              {page}
            </Link>
          ))}
        </div>
        <div className="bg-secondary/80 px-4 py-2 justify-center items-center rounded-md">
          <i className="fa-solid fa-play"></i>
        </div>
      </div>
    </div>
  );
};

export default ProductsDisplay;
