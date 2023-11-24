import { type ProductMetadata } from "@prisma/client";
import { useState } from "react";

import ProductForm from "./ProductForm";
import ProductInfo from "./ProductInfo";

const DetailsFeature = (product: ProductMetadata) => {
  //   const [variantPrice, setVariantPrice] = useState(productData.variants.edges[0].node.price)

  return (
    <div className="flex-1 flex-col justify-start h-full w-full md:w-1/2 max-w-xs mx-auto space-y-4 min-h-128">
      <ProductInfo {...product} />
      <ProductForm product={product} />
    </div>
  );
};

export default DetailsFeature;
