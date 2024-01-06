import Loading from "@components/Loading";
import { type ShopbebinProduct } from "@models/interface";

import ProductCard from "./ProductCard";

interface ProductsDisplayProps {
  products?: ShopbebinProduct[];
}

const ProductsDisplay = ({ products }: ProductsDisplayProps) => {
  if (products === undefined) {
    return <Loading />;
  }

  if (products.length === 0) {
    return <p className="text-center">No products found.</p>;
  }

  return (
    <div className="items-center flex-wrap">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductsDisplay;
