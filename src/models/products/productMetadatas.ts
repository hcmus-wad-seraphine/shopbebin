import { type Product } from "../interface";
import { getPrismaClient } from "../prisma";

export const createProduct = async (product: Product) => {
  const client = getPrismaClient();

  const createdProduct = await client.productMetadata.create({
    data: {
      name: product.name,
      desc: product.desc,
      images: product.images,
      basePrice: product.basePrice,
      availableSizes: {
        create: product.availableSizes.map(({ id, productMetadataId, ...data }) => data),
      },
      availableToppings: {
        create: product.availableToppings.map(({ toppingMetadataId }) => ({
          topping: {
            connect: {
              id: toppingMetadataId,
            },
          },
        })),
      },
      category: {
        connect: {
          id: product.categoryId,
        },
      },
    },
    include: {
      availableSizes: true,
      availableToppings: {
        include: {
          topping: true,
        },
      },
      category: true,
      reviews: {
        include: {
          reviewMetadata: {
            include: {
              user: true,
            },
          },
        },
      },
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
      availableToppings: {
        include: {
          topping: true,
        },
      },
      category: true,
      reviews: {
        include: {
          reviewMetadata: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  return product;
};

export const getProducts = async (props: {
  category?: string;
  offset?: number;
  limit?: number;
  search?: string;
  lowerBound?: number;
  upperBound?: number;
  sortAscending?: boolean;
}) => {
  const client = getPrismaClient();

  const products: Product[] = await client.productMetadata.findMany({
    where: {
      name: {
        contains: (props.search !== "" ? props.search : props.category) ?? "",
        mode: "insensitive",
      },
      basePrice: {
        gte: props.lowerBound ?? 0,
        lte: props.upperBound ?? 100000,
      },
    },
    include: {
      availableSizes: true,
      availableToppings: {
        include: {
          topping: true,
        },
      },
      category: true,
      reviews: {
        include: {
          reviewMetadata: {
            include: {
              user: true,
            },
          },
        },
      },
    },
    orderBy: {
      basePrice: props.sortAscending ?? true ? "asc" : "desc",
    },
    skip: props.offset ?? 0,
    take: props.limit ?? 9,
  });

  const total = await client.productMetadata.count({
    where: {
      name: {
        contains: props.search ?? "",
        mode: "insensitive",
      },
      basePrice: {
        gte: props.lowerBound ?? 0,
        lte: props.upperBound ?? 100000,
      },
    },
  });

  return {
    products,
    total,
  };
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
      reviews: {
        set: product.reviews,
      },
    },
    include: {
      availableSizes: true,
      availableToppings: {
        include: {
          topping: true,
        },
      },
      category: true,
      reviews: {
        include: {
          reviewMetadata: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  return updatedProduct;
};
