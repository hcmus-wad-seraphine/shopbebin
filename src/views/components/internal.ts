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