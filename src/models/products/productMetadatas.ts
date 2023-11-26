import { type Product } from "../interface";
import { getPrismaClient } from "../prisma";

export const createProduct = async (product: Product) => {
  const client = getPrismaClient();

  const createdProduct = await client.productMetadata.create({
    data: {
      name: product.name,
      desc: product.desc,
      images: product.images,
      availableSizes: {
        create: product.availableSizes.map(({ id, productMetadataId, ...data }) => data),
      },
      availableToppings: {
        create: product.availableToppings.map(({ id, productMetadataId, ...data }) => data),
      },
      category: {
        connect: {
          id: product.categoryId,
        },
      },
    },
    include: {
      availableSizes: true,
      availableToppings: true,
      category: true,
    },
  });

  return createdProduct;
};

export const getProduct = async (id: string) => {
  const client = getPrismaClient();

  const product: Product | null = await client.productMetadata.findUnique({
    where: {
      id,
    },
    include: {
      availableSizes: true,
      availableToppings: true,
      category: true,
    },
  });

  return product;
};

export const getProducts = async () => {
  const client = getPrismaClient();

  const products: Product[] = await client.productMetadata.findMany({
    include: {
      availableSizes: true,
      availableToppings: true,
      category: true,
    },
  });

  return products;
};

export const updateProduct = async (product: Product) => {
  const client = getPrismaClient();

  const { id, availableSizes, availableToppings, category, categoryId, ...data } = product;

  const updatedProduct: Product | null = await client.productMetadata.update({
    where: {
      id,
    },
    data: {
      ...data,
      availableSizes: {
        set: availableSizes,
      },
      availableToppings: {
        set: availableToppings,
      },
      category: {
        connect: {
          id: category.id,
        },
      },
    },
    include: {
      availableSizes: true,
      availableToppings: true,
      category: true,
    },
  });

  return updatedProduct;
};

export const deleteProduct = async (id: string) => {
  const client = getPrismaClient();

  const deletedProduct = await client.productMetadata.delete({
    where: {
      id,
    },
    include: {
      availableSizes: true,
      availableToppings: true,
      category: true,
    },
  });

  const promises = [];

  for (const size of deletedProduct.availableSizes) {
    promises.push(
      client.productSize.deleteMany({
        where: {
          id: size.id,
        },
      }),
    );
  }

  for (const topping of deletedProduct.availableToppings) {
    promises.push(
      client.productTopping.deleteMany({
        where: {
          id: topping.id,
        },
      }),
    );
  }

  await Promise.all(promises);
};