import { ProductMetadata } from "@prisma/client";

export const mockProducts: ProductMetadata[] = [
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
