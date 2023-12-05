import ProductsDisplay from "@components/ProductsDisplay";
import { type Product } from "@models/interface";
import { type Category } from "@prisma/client";
import UtilsBar from "@views/layouts/UtilsBar";
import { appActions, appState } from "@views/valtio";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSnapshot } from "valtio";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const { queryString } = useSnapshot(appState);

  const itemsPerPage = 9;
  const page = queryString.offset / itemsPerPage + 1;

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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const queryString = appActions.getQueryStrings();

      const endpoint =
        (category === undefined ? `/api/products` : `/api/products/categories/${category}`) +
        queryString;

      const productsResponse = await fetch(endpoint);
      const data = await productsResponse.json();

      window.scrollTo(0, 0);
      setProducts(data.products);
      setTotalProducts(data.total);
    };

    fetchData().catch((err) => {
      console.log(err);
    });
  }, [category, queryString, queryString.search]);

  return (
    <>
      <UtilsBar
        categories={categories ?? []}
        activeCategory={category ?? ""}
        onPriceFilter={({ lowerBound, upperBound }) => {
          const newQueryStrings = {
            ...queryString,
            lowerBound,
            upperBound,
          };

          appActions.updateQueryString(newQueryStrings);
        }}
        onSort={(option) => {
          const newQueryStrings = {
            ...queryString,
            sortBy: option.name,
            sortOrder: option.order,
          };

          appActions.updateQueryString(newQueryStrings);
        }}
      />
      <ProductsDisplay
        products={products}
        totalProducts={totalProducts}
        itemsPerPage={itemsPerPage}
        currentPage={page}
      />
    </>
  );
};

export default HomePage;
