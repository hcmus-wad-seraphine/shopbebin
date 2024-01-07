import { type Category } from "@prisma/client";
import CategoryRow from "@views/components/Admin/CategoryRow";
import CategoryTitleRow from "@views/components/Admin/CategoryTitleRow";
import Title from "@views/components/Title";
import { useEffect, useState } from "react";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const handleDelete = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await fetch("/api/categories");
      const catetegories = await data.json();

      setCategories(catetegories);
    };

    fetchCategories().catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div className="flex-col gap-8 w-full">
      <Title text="Categories" />
      <CategoryTitleRow />

      {categories.map((category) => (
        <CategoryRow
          key={category.id}
          category={category}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default CategoriesPage;
