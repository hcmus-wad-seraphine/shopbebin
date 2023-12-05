import ProductsDisplay from "@components/ProductsDisplay";
import { type Product } from "@models/interface";
import { type Category } from "@prisma/client";
import UtilsBar from "@views/layouts/UtilsBar";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [sortMode, setSortMode] = useState<string>("");
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");
  const itemsPerPage = 9;

  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await fetch("/api/categories/total");
      const cate = await data.json();
      setCategories(cate);
    };

    fetchCategories().catch((err) => {
      console.log(err);
    });
  }, [sortMode, isAscending]);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint =
        category === undefined
          ? `/api/products?offset=${(page - 1) * itemsPerPage}&limit=${itemsPerPage}`
          : `/api/products/categories/${category}?offset=${
              (page - 1) * itemsPerPage
            }&limit=${itemsPerPage}`;

      const productsResponse = await fetch(endpoint);
      const data = await productsResponse.json();

      window.scrollTo(0, 0);
      setProducts(data.products);
      setTotalProducts(data.total);
    };

    fetchData().catch((err) => {
      console.log(err);
    });
  }, [page, category]);

  return (
    <>
      <UtilsBar
        categories={categories ?? []}
        activeCategory={category ?? ""}
        onSelectSortMode={(sortMode, isAscending) => {
          setSortMode(sortMode);
          setIsAscending(isAscending);
        }}
      />
      <ProductsDisplay
        products={products}
        totalProducts={totalProducts}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
};

export default HomePage;
