import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProduct } from "@controllers/products";
import { ProductMetadata } from "@prisma/client";
import ProductCard from "@components/ProductsDisplay/ProductCard";
import Container from "@components/Container";
import Loading from "@components/Loading";

const ProductDetail = () => {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];

    const [product, setProduct] = useState<ProductMetadata>();

    useEffect(() => {
        const fetchProduct = async () => {
            const product = await getProduct(productId);
            setProduct(product as ProductMetadata);
        };

        fetchProduct().catch((err) => console.log(err));
    }, [productId]);

    return (
        <Container>
            {product === undefined && <Loading />}
            {product !== undefined && <ProductCard product={product} />}
        </Container>
    );
};

export default ProductDetail;
