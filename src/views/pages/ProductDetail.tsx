import Container from "@components/Container";
import Loading from "@components/Loading";
import ProductCard from "@components/ProductsDisplay/ProductCard";
import { type ProductMetadata } from "@prisma/client";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ProductDetail = () => {
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

  return (
    <Container>
      {product === undefined && <Loading />}
      {product !== undefined && <ProductCard product={product} />}
    </Container>
  );
};

export default ProductDetail;
