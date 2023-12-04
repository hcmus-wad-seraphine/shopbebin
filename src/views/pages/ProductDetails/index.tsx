import Loading from "@components/Loading";
import { type Product } from "@models/interface";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import DetailsFeature from "./DetailsFeature";
import ProductImage from "./ProductImages";
import RelatedItems from "./RelatedItems";

const ProductDetails = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await fetch(`/api/products/${productId}`);
      const product = await data.json();
      setProduct(product);
    };

    fetchProduct().catch((err) => {
      console.log(err);
    });
  }, [productId]);

  const images = product?.images ?? [];

  return (
    <div>
      {product === undefined && <Loading />}
      {product !== undefined && (
        <div className="flex-col w-full py-10 gap-10 min-h-[200vh]">
          <div className="w-full justify-start items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 gap-10">
            <ProductImage images={images} />
            <DetailsFeature {...product} />
          </div>
          <RelatedItems products={[]} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
