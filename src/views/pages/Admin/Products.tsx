import { type ShopbebinProduct } from "@models/interface";
import Pagination from "@views/components/Pagination";
import Title from "@views/components/Title";
import ProductRow from "@views/features/Products/ProductRow";
import ProductTitleRow from "@views/features/Products/ProductTitleRow";
import { appState } from "@views/valtio";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState<ShopbebinProduct[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [offset, setOffset] = useState(0);

  const limit = 10;
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `/api/products?offset=${offset}&limit=${limit}`;
      const productsResponse = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${appState.profile?.token}`,
        },
      });
      const data = await productsResponse.json();

      setProducts(data.products);
      setTotal(data.total);
    };

    fetchData().catch((err) => {
      console.log(err);
    });
  }, [limit, offset]);

  return (
    <div className="flex-col gap-2 w-full">
      <Title text="Products" />

      <ProductTitleRow />

      {products.map((product) => (
        <ProductRow
          key={product.id}
          product={product}
        />
      ))}

      <Pagination
        currentPage={currentPage}
        limit={limit}
        total={totalPages}
        onGoToPage={(page) => {
          setOffset((page - 1) * limit);
        }}
      />
    </div>
  );
};

export default ProductsPage;
