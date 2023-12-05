import { type Category } from "@prisma/client";
import Loading from "@views/components/Loading";
import { type ChangeEvent } from "react";
import { Link } from "react-router-dom";

export interface FilterPrice {
  id: string;
  lowerBound?: number;
  upperBound?: number;
  text: string;
}

const priceFilter: FilterPrice[] = [
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

interface Props {
  categories: Category[];
  activeCategory: string;
  onPriceFilter: (props: { lowerBound: number; upperBound: number }) => void;
}

const UtilsBar = ({ categories, activeCategory, onPriceFilter }: Props) => {
  const activeCategoryStyle =
    "text-secondary border-b-2 border-secondary transition duration-200 ease-in-out";

  const mockNews = [
    { id: "1", name: "New" },
    { id: "2", name: "Sale" },
    { id: "3", name: "Hot" },
    { id: "4", name: "Best" },
  ];

  const handleFilterPrice = (e: ChangeEvent<HTMLSelectElement>) => {
    const price = priceFilter.find((price) => price.id === e.target.value);
    if (price === undefined) {
      return;
    }
    const { lowerBound, upperBound } = price;
    onPriceFilter({ lowerBound: lowerBound ?? 0, upperBound: upperBound ?? 0 });
  };

  return (
    <div className="items-center justify-between py-3 px-10">
      <select className="form-select border w-20 border-gray-300 rounded-sm text-gray-900 focus:border-secondary focus:ring-secondary">
        <option value="1">All</option>
        {mockNews.map((news, index) => {
          return (
            <option
              key={index}
              value={news.id}
            >
              {news.name}
            </option>
          );
        })}
      </select>

      {categories === undefined || categories === null ? (
        <Loading />
      ) : (
        <div className="gap-6">
          <Link
            className={`${activeCategory === "" && activeCategoryStyle}`}
            to="/"
          >
            All
          </Link>
          {categories.map((category, index) => {
            let activeStyle = "";
            if (category.name === activeCategory) {
              activeStyle = activeCategoryStyle;
            }
            return (
              <Link
                key={index}
                className={`${activeStyle}`}
                to={`/categories/${category.name}`}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      )}

      <select
        className="form-select border w-20 border-gray-300 rounded-sm text-gray-900 focus:border-secondary focus:ring-secondary"
        onChange={handleFilterPrice}
      >
        {priceFilter.map((price) => {
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
  );
};

export default UtilsBar;
