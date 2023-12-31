import Loading from "@components/Loading";
import { type ShopbebinProduct } from "@models/interface";
import Reviews from "@views/components/ProductDetails/Reviews";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DetailsFeature from "./DetailsFeature";
import ProductImage from "./ProductImages";
import RelatedItems from "./RelatedItems";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<ShopbebinProduct>();
  const [relatedProducts, setRelatedProducts] = useState<ShopbebinProduct[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await fetch(`/api/products/${id}`);
      const product: ShopbebinProduct = await productData.json();

      const relatedProductsData = await fetch(`/api/products/categories/${product.category}`);
      const relatedProducts = await relatedProductsData.json();
      const filteredProducts = relatedProducts.products.filter(
        (item: ShopbebinProduct) => item.id !== product.id,
      );

      setProduct(product);
      setRelatedProducts(filteredProducts);
    };

    fetchProduct().catch((err) => {
      console.log(err);
    });
  }, []);

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
          <RelatedItems products={relatedProducts} />
          <Reviews reviews={product.reviews ?? []} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
