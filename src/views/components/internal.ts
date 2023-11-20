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

export const products: Product[] = [
    {
        id: "1",
        name: "Pizza",
        description: "Pizza",
        price: 10,
        thumbnail: "https://picsum.photos/300/300",
        toppingIds: ["1", "2"],
        sizeIds: ["1", "2"],
        stock: 10,
    },
    {
        id: "2",
        name: "Burger",
        description: "Burger",
        price: 10,
        thumbnail: "https://picsum.photos/300/300",
        toppingIds: ["1", "2"],
        sizeIds: ["1", "2"],
        stock: 10,
    },
    {
        id: "3",
        name: "Hotdog",
        description: "Hotdog",
        price: 10,
        thumbnail: "https://picsum.photos/300/300",
        toppingIds: ["1", "2"],
        sizeIds: ["1", "2"],
        stock: 10,
    },
    {
        id: "1",
        name: "Pizza",
        description: "Pizza",
        price: 10,
        thumbnail: "https://picsum.photos/300/300",
        toppingIds: ["1", "2"],
        sizeIds: ["1", "2"],
        stock: 10,
    },
    {
        id: "2",
        name: "Burger",
        description: "Burger",
        price: 10,
        thumbnail: "https://picsum.photos/300/300",
        toppingIds: ["1", "2"],
        sizeIds: ["1", "2"],
        stock: 10,
    },
    {
        id: "3",
        name: "Hotdog",
        description: "Hotdog",
        price: 10,
        thumbnail: "https://picsum.photos/300/300",
        toppingIds: ["1", "2"],
        sizeIds: ["1", "2"],
        stock: 10,
    },    {
        id: "1",
        name: "Pizza",
        description: "Pizza",
        price: 10,
        thumbnail: "https://picsum.photos/300/300",
        toppingIds: ["1", "2"],
        sizeIds: ["1", "2"],
        stock: 10,
    },
    {
        id: "2",
        name: "Burger",
        description: "Burger",
        price: 10,
        thumbnail: "https://picsum.photos/300/300",
        toppingIds: ["1", "2"],
        sizeIds: ["1", "2"],
        stock: 10,
    },
    {
        id: "3",
        name: "Hotdog",
        description: "Hotdog",
        price: 10,
        thumbnail: "https://picsum.photos/300/300",
        toppingIds: ["1", "2"],
        sizeIds: ["1", "2"],
        stock: 10,
    },    {
        id: "1",
        name: "Pizza",
        description: "Pizza",
        price: 10,
        thumbnail: "https://picsum.photos/300/300",
        toppingIds: ["1", "2"],
        sizeIds: ["1", "2"],
        stock: 10,
    },
    {
        id: "2",
        name: "Burger",
        description: "Burger",
        price: 10,
        thumbnail: "https://picsum.photos/300/300",
        toppingIds: ["1", "2"],
        sizeIds: ["1", "2"],
        stock: 10,
    },
    {
        id: "3",
        name: "Hotdog",
        description: "Hotdog",
        price: 10,
        thumbnail: "https://picsum.photos/300/300",
        toppingIds: ["1", "2"],
        sizeIds: ["1", "2"],
        stock: 10,
    },
];