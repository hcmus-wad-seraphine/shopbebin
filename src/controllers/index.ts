import { Product } from "../models/type";

export const getProducts = async () => {
    const fetchProducts = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    { id: 1, name: "Product 1" },
                    { id: 2, name: "Product 2" },
                    { id: 3, name: "Product 3" },
                ] satisfies Product[]);
            }, 1000);
        });
    };

    const products = await fetchProducts();

    return products;
};
