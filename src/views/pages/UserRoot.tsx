import { useEffect, useState } from "react";
import Container from "../components/Container";
import UtilsBar from "../components/UtilsBar";
import ProductsDisplay from "../components/ProductsDisplay";
import { ProductMetadata } from "@prisma/client";

const UserRoot = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<ProductMetadata[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("/api/products");
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        };

        fetchProducts().catch(console.error);
    }, []);

    return (
        <Container>
            <UtilsBar />
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ProductsDisplay products={products} pageNumber={1} />
            )}
        </Container>
    );
};

export default UserRoot;
