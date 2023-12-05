import ProductsDisplay from "@components/ProductsDisplay";
import { type Product } from "@models/interface";
import { type Category } from "@prisma/client";
import UtilsBar from "@views/layouts/UtilsBar";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

interface QueryStrings {
  page: number;
  search: string;
  lowerBound: number;
  upperBound: number;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const [searchParams] = useSearchParams();

  const [queryStrings, setQueryStrings] = useState<QueryStrings>({
    page: parseInt(searchParams.get("page") ?? "1"),
    search: searchParams.get("search") ?? "",
    lowerBound: parseInt(searchParams.get("lowerBound") ?? "0"),
    upperBound: parseInt(searchParams.get("upperBound") ?? "0"),
  });

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
  }, []);

  useEffect(() => {
    setQueryStrings({
      page: parseInt(searchParams.get("page") ?? "1"),
      search: searchParams.get("search") ?? "",
      lowerBound: parseInt(searchParams.get("lowerBound") ?? "0"),
      upperBound: parseInt(searchParams.get("upperBound") ?? "0"),
    });
  }, [searchParams, category]);

  useEffect(() => {
    const fetchData = async () => {
      let queryString = "";

      if (queryStrings.page !== 1) {
        queryString += `?offset=${(queryStrings.page - 1) * itemsPerPage}&limit=${itemsPerPage}`;
      }

      if (category === undefined && queryStrings.search !== "") {
        queryString += queryString === "" ? "?" : "&";
        queryString += `search=${queryStrings.search}`;
      }

      if (queryStrings.lowerBound !== 0) {
        queryString += queryString === "" ? "?" : "&";
        queryString += `lowerBound=${queryStrings.lowerBound}`;
      }

      if (queryStrings.upperBound !== 0) {
        queryString += queryString === "" ? "?" : "&";
        queryString += `upperBound=${queryStrings.upperBound}`;
      }

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
  }, [queryStrings]);

  return (
    <>
      <UtilsBar
        categories={categories ?? []}
        activeCategory={category ?? ""}
        onPriceFilter={(props) => {
          const { lowerBound, upperBound } = props;

          const newQueryStrings = {
            ...queryStrings,
            lowerBound: lowerBound ?? 0,
            upperBound: upperBound ?? 0,
          };

          setQueryStrings(newQueryStrings);
        }}
        onSort={(option) => {
          console.log("--> sort option", option);
        }}
      />
      <ProductsDisplay
        products={products}
        totalProducts={totalProducts}
        itemsPerPage={itemsPerPage}
        currentPage={queryStrings.page}
      />
    </>
  );
};

export default HomePage;
