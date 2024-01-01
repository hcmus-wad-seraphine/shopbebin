import { type ShopbebinProduct } from "@models/interface";
import ProductCard from "@views/components/ProductsDisplay/ProductCard";
import { useRef } from "react";

interface RelatedItemsProps {
  products: ShopbebinProduct[];
}

const RelatedItems = ({ products }: RelatedItemsProps) => {
  const ref = useRef<HTMLDivElement>();
  const scroll = (scrollOffset: number) => {
    if (ref.current !== undefined) {
      ref.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div className="flex-col">
      <h1 className="text-3xl font-semibold text-center mb-8">Related Items</h1>
      <div className="relative flex border-t border-secondary">
        <button
          aria-label="left-scroll"
          className="h-full bg-secondary/70 hover:bg-palette-light  absolute left-0 z-[1] opacity-75 px-1"
          onClick={() => {
            scroll(-300);
          }}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <div
          ref={ref}
          style={{ scrollBehavior: "smooth" }}
          className="space-x-1 w-full overflow-auto border-t border-secondary"
        >
          {products.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
            />
          ))}
        </div>

        <button
          aria-label="right-scroll"
          className="h-full bg-secondary/70 hover:bg-palette-light  absolute right-0 z-[1] opacity-75 px-1"
          onClick={() => {
            scroll(300);
          }}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default RelatedItems;
