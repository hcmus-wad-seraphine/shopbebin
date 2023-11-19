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
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <p>Products:</p>
          <i className="fa-solid fa-bell"></i>
          <ul>
            {products.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>

          <a href="/cart">Cart</a>
        </div>
      )}
    </Container>
  );
};

export default UserRoot;
