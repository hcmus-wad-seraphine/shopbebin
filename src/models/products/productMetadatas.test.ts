import { type Category, type ProductSize, Size, type ToppingMetadata } from "@prisma/client";

import { type Product, type Topping } from "../interface";
import {
  createCategory,
  createProduct,
  createProductSize,
  createProductTopping,
  createTopping,
  deleteCategory,
  deleteProduct,
  deleteTopping,
  getProduct,
  updateProduct,
} from ".";

describe("Product Metadata Model", () => {
  const randomName = Math.random().toString(36).substring(7);
  const randomDescription = Math.random().toString(36).substring(7);
  const randomImage = Math.random().toString(36).substring(7);

  let category: Category = {
    id: "",
    name: randomName,
    desc: randomDescription,
    image: randomImage,
    itemCount: 0,
  };

  let category2: Category = {
    id: "",
    name: randomName + " 2",
    desc: randomDescription + " 2",
    image: randomImage,
    itemCount: 0,
  };

  let productSize: ProductSize = {
    id: "",
    size: Size.S,
    price: 100,
    stock: 10,
    productMetadataId: null,
  };

  let topping: ToppingMetadata = {
    id: "",
    name: randomName,
    desc: randomDescription,
    price: 100,
    image: randomImage,
    stock: 10,
  };

  let topping2: ToppingMetadata = {
    id: "",
    name: randomName + " 2",
    desc: randomDescription + " 2",
    price: 100,
    image: randomImage,
    stock: 10,
  };

  let product: Product = {
    id: "",
    name: randomName,
    desc: randomDescription,
    images: [],
    availableSizes: [],
    availableToppings: [],
    categoryId: category.id,
    category,
  };

  it("setup", async () => {
    category = await createCategory(category);
    category2 = await createCategory(category2);
    topping = await createTopping(topping);
    topping2 = await createTopping(topping2);
  });

  it("product full flow", async () => {
    const productTopping: Topping = {
      id: "",
      productMetadataId: null,
      toppingMetadataId: topping.id,
      topping,
    };

    product = {
      id: "",
      name: randomName,
      desc: randomDescription,
      images: [randomImage],
      availableSizes: [productSize],
      availableToppings: [productTopping],
      categoryId: category.id,
      category,
    };

    product = await createProduct(product);
    expect(product.id).toBeDefined();
    expect(product.availableSizes.length).toEqual(1);
    expect(product.availableToppings.length).toEqual(1);
    expect(product.categoryId).toEqual(category.id);

    console.log("--> createdProduct", product);
  });

  it("update project", async () => {
    const fetchedProduct = await getProduct(product.id);
    if (fetchedProduct == null) {
      throw new Error("Product not found");
    }
    expect(fetchedProduct).toEqual(product);

    let productTopping2: Topping = {
      id: "",
      productMetadataId: product.id,
      toppingMetadataId: topping2.id,
      topping: topping2,
    };
    productTopping2 = await createProductTopping(productTopping2);

    productSize = product.availableSizes[0];
    let productSize2: ProductSize = {
      id: "",
      size: Size.M,
      price: 125,
      stock: 14,
      productMetadataId: product.id,
    };
    productSize2 = await createProductSize(productSize2);

    let updatedProduct: Product = {
      ...fetchedProduct,
      name: randomName + " 2",
      desc: randomDescription + " 2",
      images: [randomImage + " 2"],
      availableSizes: [productSize, productSize2],
      availableToppings: [fetchedProduct.availableToppings[0], productTopping2],
      categoryId: category2.id,
      category: category2,
    };

    updatedProduct = await updateProduct(updatedProduct);
    expect(updatedProduct.id).toEqual(fetchedProduct.id);
    expect(updatedProduct.name).toEqual(randomName + " 2");
    expect(updatedProduct.desc).toEqual(randomDescription + " 2");
    expect(updatedProduct.images).toEqual([randomImage + " 2"]);
    expect(updatedProduct.categoryId).toEqual(category2.id);

    console.log("--> updatedProduct", updatedProduct);
    console.log("--> updatedProductToppings", updatedProduct.availableToppings);
  });

  it("cleanup", async () => {
    await deleteProduct(product.id);
    await deleteTopping(topping.id);
    await deleteTopping(topping2.id);
    await deleteCategory(category.id);
    await deleteCategory(category2.id);
  });
});
