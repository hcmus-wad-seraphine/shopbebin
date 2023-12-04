import { type Product } from "@models/interface";
import { type ProductSize } from "@prisma/client";
import { useState } from "react";

import ProductForm from "./ProductForm";
import ProductInfo from "./ProductInfo";

const DetailsFeature = (product: Product) => {
  const [size, setSize] = useState<ProductSize>(product.availableSizes[0]);

  return (
    <div className="flex-1 flex-col justify-start h-full w-full mx-auto space-y-4 min-h-128">
      <ProductInfo
        name={product.name}
        desc={product.desc}
        price={size.price}
      />
      <ProductForm
        sizes={product.availableSizes}
        toppings={product.availableToppings}
        onChangeSize={(size) => {
          setSize(size);
        }}
      />
    </div>
  );
};

export default DetailsFeature;
