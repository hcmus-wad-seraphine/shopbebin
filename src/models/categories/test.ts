import { type Category } from "@prisma/client";

import { createCategory, deleteCategory, getCategoryByName, updateCategory } from ".";

describe("Category model", () => {
  const randomName = Math.random().toString(36).substring(7);
  const randomDescription = Math.random().toString(36).substring(7);

  let category: Category = {
    id: "",
    name: randomName,
    desc: randomDescription,
    image: "",
    itemCount: 0,
  };

  test("create category", async () => {
    await createCategory({
      name: category.name,
      desc: category.desc,
      image: category.image,
      itemCount: category.itemCount,
    });
    const createdCategory = await getCategoryByName(category.name);
    expect(createdCategory).not.toBeNull();
    category = createdCategory as Category;
  });

  test("get category by name", async () => {
    const foundCategory = await getCategoryByName(category.name);
    expect(foundCategory).not.toBeNull();
    expect(foundCategory).toEqual(category);
  });

  test("update category", async () => {
    const newName = Math.random().toString(36).substring(7);
    category.name = newName;
    await updateCategory(category);
    const updatedCategory = await getCategoryByName(category.name);
    expect(updatedCategory).not.toBeNull();
    expect(updatedCategory).toEqual(category);
  });

  test("delete category", async () => {
    await deleteCategory(category.id);
    const deletedCategory = await getCategoryByName(category.name);
    expect(deletedCategory).toBeNull();
  });
});
