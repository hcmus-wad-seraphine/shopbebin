import { useEffect, useState } from "react";
import Container from "../components/Container";

const UserRoot = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<
        {
            id: number;
            name: string;
        }[]
    >([]);

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
            <h1>User Root</h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p>Products:</p>
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>{product.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </Container>
    );
};

export default UserRoot;
