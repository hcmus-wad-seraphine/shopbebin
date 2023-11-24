import { type Category } from "@prisma/client";

import { createCategory, deleteCategory, getCategory, getCategoryByName, updateCategory } from ".";

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
    category = await createCategory(category);
    expect(category).not.toBeNull();
  });

  test("get category by id", async () => {
    const foundCategory = await getCategory(category.id);
    expect(foundCategory).not.toBeNull();
    expect(foundCategory).toEqual(category);
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
