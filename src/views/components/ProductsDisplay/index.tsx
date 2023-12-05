import Loading from "@components/Loading";
import { type Product } from "@models/interface";
import { Link } from "react-router-dom";

import ProductCard from "./ProductCard";

interface ProductsDisplayProps {
  products?: Product[];
  totalProducts: number;
  itemsPerPage: number;
  currentPage: number;
}

const ProductsDisplay = ({
  products,
  totalProducts,
  itemsPerPage,
  currentPage,
}: ProductsDisplayProps) => {
  const numberOfPages = Math.ceil(totalProducts / itemsPerPage);
  const pages = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(i);
  }

  if (products === undefined) {
    return <Loading />;
  }

  return (
    <div className="flex-col items-center">
      <div className="w-full  items-center flex-wrap px-10 py-10">
        {products.map((product) => (
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
          {pages.map((page) => {
            let activeStyle = "";
            if (currentPage === page) {
              activeStyle = "bg-primary/50 text-white";
            }

            return (
              <Link
                key={page.toString()}
                className={`bg-secondary/50 w-8 h-8 flex justify-center items-center rounded-2xl ${activeStyle}`}
                to={`/?page=${page}`}
              >
                {page}
              </Link>
            );
          })}
        </div>
        <div className="bg-secondary/80 px-4 py-2 justify-center items-center rounded-md">
          <i className="fa-solid fa-play"></i>
        </div>
      </div>
    </div>
  );
};

export default ProductsDisplay;
