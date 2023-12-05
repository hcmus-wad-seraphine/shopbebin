import { type Category } from "@prisma/client";
import Loading from "@views/components/Loading";
import { Link } from "react-router-dom";

interface Props {
  categories: Category[];
  activeCategory: string;
  onSelectPriceRange?: (price: number) => void;
}

const UtilsBar = ({ categories, activeCategory }: Props) => {
  const activeCategoryStyle =
    "text-secondary border-b-2 border-secondary transition	duration-200 ease-in-out";

  const mockNews = [
    { id: "1", name: "New" },
    { id: "2", name: "Sale" },
    { id: "3", name: "Hot" },
    { id: "4", name: "Best" },
  ];

  const mockPrice = [
    { id: "1", name: "$ 4-10" },
    { id: "2", name: "$ 10-15" },
    { id: "3", name: "$ 15-20" },
    { id: "4", name: "$ 20-25" },
  ];

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
                to={`/category/${category.name}`}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      )}

      <select className="form-select border w-20 border-gray-300 rounded-sm text-gray-900 focus:border-secondary focus:ring-secondary">
        <option value="1">All</option>
        {mockPrice.map((price, index) => {
          return (
            <option
              key={index}
              value={price.id}
            >
              {price.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default UtilsBar;
