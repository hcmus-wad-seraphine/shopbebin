import { type Category } from "@prisma/client";
import { useState } from "react";

interface Props {
  categories: Category[];
  onSelectCategory: (category: Category) => void;
  onSelectPriceRange: (price: number) => void;
  onSelectNews: (news: string) => void;
}

const UtilsBar = ({ categories, onSelectCategory }: Props) => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const activeCategoryStyle =
    "text-secondary border-b-2 border-secondary transition	duration-200 ease-in-out";
  const mockCategories = [
    { id: "1", name: "Milktea" },
    { id: "2", name: "Pizza" },
    { id: "3", name: "Burger" },
    { id: "4", name: "Drink" },
  ];

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

      <div className="gap-6">
        <button
          onClick={() => {
            setActiveCategory(null);
          }}
          className={`${activeCategory === null && activeCategoryStyle}`}
        >
          All
        </button>
        {mockCategories.map((category, index) => {
          let activeStyle = "";
          if (category.id === activeCategory?.id) {
            activeStyle = activeCategoryStyle;
          }
          return (
            <button
              key={index}
              className={`${activeStyle}`}
              onClick={() => {
                setActiveCategory(category);
                onSelectCategory(category);
              }}
            >
              {category.name}
            </button>
          );
        })}
      </div>

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
