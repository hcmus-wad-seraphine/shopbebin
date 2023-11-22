import { mockProducts } from "@models/database/mock";

export const getProduct = async (id: string) => {
    const fetchProduct = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(mockProducts.find((product) => product.id === id));
            }, 500);
        });
    };

    const product = await fetchProduct();

    return product;
};

export const getProducts = async () => {
    const fetchProducts = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(mockProducts);
            }, 500);
        });
    };

    const products = await fetchProducts();

    return products;
};
