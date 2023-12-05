import { type Category } from "@prisma/client";
import Loading from "@views/components/Loading";
import { Link } from "react-router-dom";

interface Props {
  categories: Category[];
  activeCategory: string;
  onSelectPriceRange?: (price: number) => void;
  onSelectSortMode?: (sortMode: string, isAscending: boolean) => void;
}

const UtilsBar = ({ categories, activeCategory, onSelectSortMode }: Props) => {
  const activeCategoryStyle =
    "text-secondary border-b-2 border-secondary transition	duration-200 ease-in-out";

  const sortList = [
    {
      id: "1",
      name: "Price",
      isAscending: true,
    },
    {
      id: "2",
      name: "Price",
      isAscending: false,
    },
  ];

  const mockPrice = [
    { id: "1", name: "$ 4-10" },
    { id: "2", name: "$ 10-15" },
    { id: "3", name: "$ 15-20" },
    { id: "4", name: "$ 20-25" },
  ];

  return (
    <div className="items-center justify-between py-3 px-10">
      <select className="form-select border w-40 border-gray-300 rounded-sm text-gray-900 focus:border-secondary focus:ring-secondary">
        <option value="1">All</option>
        {sortList.map((sort, index) => {
          const mode = sort.isAscending ? "ascending" : "descending";
          return (
            <option
              key={index}
              value={sort.id}
              onChange={() => {
                onSelectSortMode?.(sort.name, sort.isAscending);
              }}
            >
              <div>
                {sort.name} {mode}
              </div>
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
