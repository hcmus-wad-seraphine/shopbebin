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

  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get("page") ?? "1";
  const pageNumber = parseInt(pageParam);
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
    const fetchData = async () => {
      const endpoints =
        category === undefined
          ? {
              products: `/api/products?offset=${
                (pageNumber - 1) * itemsPerPage
              }&limit=${itemsPerPage}`,
              totalProducts: `/api/products/total`,
            }
          : {
              products: `/api/products/categories/${category}?offset=${
                (pageNumber - 1) * itemsPerPage
              }&limit=${itemsPerPage}`,
              totalProducts: `/api/products/total/${category}`,
            };

      const productsResponse = await fetch(endpoints.products);
      const productsData = await productsResponse.json();

      const totalProductsResponse = await fetch(endpoints.totalProducts);
      const totalProductsData = await totalProductsResponse.json();

      window.scrollTo(0, 0);
      setProducts(productsData);
      setTotalProducts(totalProductsData);
    };

    fetchData().catch((err) => {
      console.log(err);
    });
  }, [pageNumber, category]);

  return (
    <>
      <UtilsBar
        categories={categories ?? []}
        activeCategory={category ?? ""}
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
