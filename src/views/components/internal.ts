import { ProductMetadata } from "@prisma/client"

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    thumbnail: string;
    toppingIds: string[];
    sizeIds: string[];
    stock: number;
}

export interface Topping {
    id: string;
    name: string;
    price: number;
}

export interface Size {
    id: string;
    name: string;
    price: number;
}

export const products: ProductMetadata[] = [
    {
        id: "smoothie-strawberry-bubble",
        name: "Strawberry Bubble",
        desc: "",
        images: ["/img/smoothie-strawberry-bubble.png"],
    },
    {
        id: "tea-lemon-bubble",
        name: "Lemon Bubble",
        desc: "",
        images: ["/img/tea-lemon-bubble.png"],
    },
    {
        id: "tea-matcha-bubble",
        name: "Matcha Bubble",
        desc: "",
        images: ["/img/tea-matcha-bubble.png"],
    },
    {
        id: "tea-redthai-bubble",
        name: "Red Thai Bubble",
        desc: "",
        images: ["/img/tea-redthai-bubble.png"],
    },
];