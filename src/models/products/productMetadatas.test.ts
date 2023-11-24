import {
  type Category,
  type ProductSize,
  type ProductTopping,
  Size,
  type ToppingMetadata,
} from "@prisma/client";

import { type Product } from "../interface";
import { createCategory, createProduct, createTopping, getProduct, updateProduct } from ".";

describe("Product Metadata Model", () => {
  it("product full flow", async () => {
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

    const productSize: ProductSize = {
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

    category = await createCategory(category);
    topping = await createTopping(topping);

    const productTopping: ProductTopping = {
      id: "",
      productMetadataId: null,
      toppingMetadataId: topping.id,
    };

    const product: Product = {
      id: "",
      name: randomName,
      desc: randomDescription,
      images: [randomImage],
      availableSizes: [productSize],
      availableToppings: [productTopping],
      categoryId: category.id,
      category,
    };

    const createdProduct = await createProduct(product);
    expect(createdProduct.id).toBeDefined();
    expect(createdProduct.name).toEqual(product.name);
    expect(createdProduct.desc).toEqual(product.desc);
    expect(createdProduct.images).toEqual(product.images);
    expect(createdProduct.availableSizes.length).toEqual(1);
    expect(createdProduct.availableToppings.length).toEqual(1);
    expect(createdProduct.categoryId).toEqual(category.id);

    const fetchedProduct = await getProduct(createdProduct.id);
    if (fetchedProduct == null) {
      throw new Error("Product not found");
    }
    expect(fetchedProduct).toEqual(createdProduct);

    let newCategory: Category = {
      id: "",
      name: randomName + " 2",
      desc: randomDescription + " 2",
      image: randomImage,
      itemCount: 0,
    };
    newCategory = await createCategory(newCategory);

    let topping2: ToppingMetadata = {
      id: "",
      name: randomName + " 2",
      desc: randomDescription + " 2",
      price: 100,
      image: randomImage,
      stock: 10,
    };
    topping2 = await createTopping(topping2);

    const productTopping2: ProductTopping = {
      id: "",
      productMetadataId: null,
      toppingMetadataId: topping2.id,
    };

    let updatedProduct: Product = {
      ...createdProduct,
      name: randomName + " 2",
      desc: randomDescription + " 2",
      images: [randomImage + " 2"],
      availableSizes: [productSize],
      availableToppings: [productTopping2],
      categoryId: newCategory.id,
      category: newCategory,
    };
    updatedProduct = await updateProduct(updatedProduct);

    console.log("--> updatedProduct", updatedProduct);

    expect(updatedProduct.id).toEqual(createdProduct.id);
    expect(updatedProduct.name).toEqual(randomName + " 2");
    expect(updatedProduct.desc).toEqual(randomDescription + " 2");
    expect(updatedProduct.images).toEqual([randomImage + " 2"]);
    expect(updatedProduct.categoryId).toEqual(newCategory.id);
  });
});
