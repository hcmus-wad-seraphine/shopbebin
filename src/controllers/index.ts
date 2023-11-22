import { mockProducts } from "../models/database/mock";

export const getProducts = async () => {
    const fetchProducts = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(mockProducts);
            }, 1000);
        });
    };

    const products = await fetchProducts();

    return products;
};
