import { type ShopbebinProduct } from "@models/interface";
import ProductRow from "@views/features/Products/ProductRow";
import ProductTitleRow from "@views/features/Products/ProductTitleRow";
import { appActions, appState } from "@views/valtio";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";

const ProductsPage = () => {
  const [products, setProducts] = useState<ShopbebinProduct[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const { queryString } = useSnapshot(appState);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = "/api/products" + appActions.getQueryStrings();

      const productsResponse = await fetch(endpoint);
      const data = await productsResponse.json();

      setProducts(data.products);
      setTotalProducts(data.total);
    };

    fetchData().catch((err) => {
      console.log(err);
    });
  }, [queryString]);

  return (
    <div className="flex-col gap-2">
      <ProductTitleRow />

      {products.map((product) => (
        <ProductRow
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductsPage;
