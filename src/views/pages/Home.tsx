import ProductsDisplay from "@components/ProductsDisplay";
import { type ShopbebinProduct } from "@models/interface";
import { type Category } from "@prisma/client";
import { useDebounce } from "@uidotdev/usehooks";
import Pagination from "@views/components/Pagination";
import { type ChangeEvent, useEffect, useState } from "react";

const activeCategoryStyle =
  "text-secondary border-b-2 border-secondary transition duration-200 ease-in-out";

export interface FilterPrice {
  id: string;
  lowerBound?: number;
  upperBound?: number;
  text: string;
}

const priceFilterList: FilterPrice[] = [
  {
    id: "all",
    text: "All",
  },
  {
    id: "under-5",
    lowerBound: 0,
    upperBound: 5,
    text: "≤ $5",
  },
  {
    id: "6-10",
    lowerBound: 6,
    upperBound: 10,
    text: "$6 - $10",
  },
  {
    id: "11-15",
    lowerBound: 11,
    upperBound: 15,
    text: "$11 - $15",
  },
  {
    id: "over-16",
    lowerBound: 16,
    text: "≥ $16",
  },
];

const HomePage = () => {
  const [products, setProducts] = useState<ShopbebinProduct[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [category, setCategory] = useState<Category | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [offset, setOffset] = useState(0);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [priceFilter, setPriceFilter] = useState<FilterPrice>(priceFilterList[0]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const limit = 9;
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
      let endpoint = `/api/products?limit=${limit}`;

      if (offset !== 0) {
        endpoint += `&offset=${offset}`;
      }

      if (category !== null) {
        endpoint += `&category=${category.name}`;
      }

      if (sortOrder !== "asc") {
        endpoint += `&sortOrder=${sortOrder}`;
      }

      if (priceFilter.id !== "all") {
        if (priceFilter.lowerBound !== undefined) {
          endpoint += `&lowerBound=${priceFilter.lowerBound}`;
        }

        if (priceFilter.upperBound !== undefined) {
          endpoint += `&upperBound=${priceFilter.upperBound}`;
        }
      }

      if (debouncedSearch !== "") {
        endpoint += `&search=${debouncedSearch}`;
      }

      const productsResponse = await fetch(endpoint);
      const data = await productsResponse.json();

      window.scrollTo(0, 0);
      setProducts(data.products);
      setTotal(data.total);
    };

    fetchData().catch((err) => {
      console.log(err);
    });
  }, [category, offset, sortOrder, priceFilter, debouncedSearch]);

  const handleFilterPrice = (e: ChangeEvent<HTMLSelectElement>) => {
    const price = priceFilterList.find((price) => price.id === e.target.value);
    if (price === undefined) {
      return;
    }
    setPriceFilter(
      priceFilterList.find((price) => price.id === e.target.value) ?? priceFilterList[0],
    );
  };

  return (
    <div className="flex-col justify-center gap-8 py-3 px-10">
      <div className="p-2 border border-gray-400 bg-white rounded-full items-center justify-between">
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

      <div className="items-center justify-between">
        <select
          className="border w-40 border-gray-300 rounded-sm text-gray-900 focus:border-secondary focus:ring-secondary font-fontawesome p-2"
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value as "asc" | "desc");
          }}
        >
          <option value="asc">Price &#xf062;</option>
          <option value="desc">Price &#xf063;</option>
        </select>

        <div className="gap-6">
          <button
            className={`${!category && activeCategoryStyle}`}
            onClick={() => {
              setCategory(null);
            }}
          >
            All
          </button>

          {categories?.map((item, index) => {
            return (
              <button
                key={index}
                className={`${category === item && activeCategoryStyle}`}
                onClick={() => {
                  setCategory(item);
                }}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        <select
          className="form-select border w-20 border-gray-300 rounded-sm text-gray-900 focus:border-secondary focus:ring-secondary"
          onChange={handleFilterPrice}
        >
          {priceFilterList.map((price) => {
            return (
              <option
                key={price.id}
                value={price.id}
              >
                {price.text}
              </option>
            );
          })}
        </select>
      </div>

      <ProductsDisplay products={products} />

      {products && products.length > 0 && (
        <Pagination
          currentPage={currentPage}
          limit={limit}
          total={totalPages}
          onGoToPage={(page) => {
            setOffset((page - 1) * limit);
          }}
        />
      )}
    </div>
  );
};

export default HomePage;
