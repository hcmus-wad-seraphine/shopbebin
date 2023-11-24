import { type ProductSize, Size } from "@prisma/client";

import { createProductSize, deleteProductSize, getProductSize, updateProductSize } from ".";

describe("Product Sizes", () => {
  let productSize: ProductSize = {
    id: "",
    size: Size.S,
    price: 100,
    productMetadataId: null,
    stock: 10,
  };

  it("create a product size", async () => {
    productSize = await createProductSize({
      price: productSize.price,
      productMetadataId: productSize.productMetadataId,
      size: productSize.size,
      stock: productSize.stock,
    });
    expect(productSize).toEqual(productSize);
  });

  it("get a product size", async () => {
    const fetchedProductSize = await getProductSize(productSize.id);
    expect(fetchedProductSize).toEqual(productSize);
  });

  it("update a product size", async () => {
    const updatedProductSize: ProductSize = {
      ...productSize,
      price: 200,
    };
    await updateProductSize(updatedProductSize);
    const fetchedProductSize = await getProductSize(productSize.id);
    expect(fetchedProductSize).toEqual(updatedProductSize);
  });

  it("delete a product size", async () => {
    await deleteProductSize(productSize.id);
    const fetchedProductSize = await getProductSize(productSize.id);
    expect(fetchedProductSize).toBeNull();
  });
});
