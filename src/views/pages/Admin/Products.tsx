import { type ShopbebinProduct } from "@models/interface";
import { type Category } from "@prisma/client";
import { useDebounce } from "@uidotdev/usehooks";
import Pagination from "@views/components/Pagination";
import Title from "@views/components/Title";
import ProductRow from "@views/features/Products/ProductRow";
import ProductTitleRow from "@views/features/Products/ProductTitleRow";
import { appState } from "@views/valtio";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState<ShopbebinProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>();
  const [category, setCategory] = useState<Category | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const limit = 10;
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

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
      let endpoint = `/api/products?offset=${offset}&limit=${limit}`;

      if (category !== null) {
        endpoint += `&category=${category.name}`;
      }

      if (search !== "") {
        endpoint += `&search=${search}`;
      }

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
  }, [limit, offset, category, debouncedSearch]);

  return (
    <div className="flex-col gap-8 w-full">
      <Title text="Products" />

      <div className="items-center gap-4">
        <p className="mb-2 text-lg font-semibold text-gray-600">Sort by category:</p>
        <select
          className="px-2 py-1 border border-gray-400 bg-white rounded-full"
          value={category?.name ?? "all"}
          onChange={(e) => {
            if (e.target.value === "all") {
              setCategory(null);
            } else {
              setCategory(categories?.find((c) => c.name === e.target.value) ?? null);
            }
          }}
        >
          <option value="all">All</option>
          {categories?.map((category) => (
            <option
              key={category.id}
              value={category.name}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="px-4 py-2 border border-gray-400 bg-white rounded-full items-center justify-between">
        <input
          className="flex-1 border-none outline-none rounded-md"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <i className="fas fa-search text-black"></i>
      </div>

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
