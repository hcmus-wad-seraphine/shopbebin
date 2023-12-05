import ProductsDisplay from "@components/ProductsDisplay";
import { type Product } from "@models/interface";
import { type Category } from "@prisma/client";
import UtilsBar from "@views/layouts/UtilsBar";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get("page") ?? "1";
  const pageNumber = parseInt(pageParam);
  const itemsPerPage = 9;

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
      if (activeCategory === null) {
        const productsResponse = await fetch(
          `/api/products?offset=${(pageNumber - 1) * itemsPerPage}&limit=${itemsPerPage}`,
        );
        const productsData = await productsResponse.json();

        const totalProductsResponse = await fetch("/api/products/total");
        const totalProductsData = await totalProductsResponse.json();

        window.scrollTo(0, 0);
        setProducts(productsData);
        setTotalProducts(totalProductsData);
      } else {
        const productsResponse = await fetch(`/api/categories/${activeCategory.name}`);

        const productsData = await productsResponse.json();
        setProducts(productsData);
        setTotalProducts(activeCategory.itemCount);
      }
    };

    fetchData().catch((err) => {
      console.log(err);
    });
  }, [pageNumber, activeCategory]);

  return (
    <>
      <UtilsBar
        categories={categories}
        onSelectCategory={setActiveCategory}
      />
      <ProductsDisplay
        products={products}
        totalProducts={totalProducts}
      />
    </>
  );
};

export default HomePage;
