import { type ToppingMetadata } from "@prisma/client";

import { createTopping, deleteTopping, getTopping, updateTopping } from ".";

describe("Topping model", () => {
  const randomName = Math.random().toString(36).substring(7);
  const randomDescription = Math.random().toString(36).substring(7);
  const randomPrice = Math.random() * 100;

  let topping: ToppingMetadata = {
    id: "",
    name: randomName,
    desc: randomDescription,
    price: randomPrice,
    image: "",
    stock: 10,
  };

  test("create topping", async () => {
    topping = await createTopping(topping);
    expect(topping).not.toBeNull();
  });

  test("get topping by id", async () => {
    const foundTopping = await getTopping(topping.id);
    expect(foundTopping).not.toBeNull();
    expect(foundTopping).toEqual(topping);
  });

  test("update topping", async () => {
    const newName = Math.random().toString(36).substring(7);
    topping.name = newName;
    await updateTopping(topping);
    const updatedTopping = await getTopping(topping.id);
    expect(updatedTopping).not.toBeNull();
    expect(updatedTopping).toEqual(topping);
  });

  test("delete topping", async () => {
    await deleteTopping(topping.id);
    const deletedTopping = await getTopping(topping.id);
    expect(deletedTopping).toBeNull();
  });
});
