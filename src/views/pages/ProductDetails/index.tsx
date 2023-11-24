import Container from "@components/Container";
import Loading from "@components/Loading";
import { type ProductMetadata } from "@prisma/client";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import DetailsFeature from "./DetailsFeature";
import ProductImage from "./ProductImages";

const ProductDetails = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  const [product, setProduct] = useState<ProductMetadata>();

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
    <Container>
      {product === undefined && <Loading />}
      {product !== undefined && (
        <div className="w-full flex-col justify-start items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 gap-10 py-10">
          <ProductImage images={images} />
          <DetailsFeature {...product} />
        </div>
      )}
    </Container>
  );
};

export default ProductDetails;
