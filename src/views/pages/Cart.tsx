import Button from "@components/Button";
import CartTable from "@components/Cart/CartTable";
import Container from "@components/Container";
import { products } from "@components/internal";

const CartPage = () => {
    const cart = products;

    return (
        <Container isAdmin={false}>
            <div className="container mx-auto mb-20 min-h-screen flex-col py-10">
                <h1 className="font-bold text-primary text-2xl self-center">
                    YOUR CART
                </h1>
                <CartTable cart={cart} />

                <Button href="/checkout" style="max-w-[200px] self-center">
                    <i className="fa-solid fa-money-check"></i>
                    <p>Check out</p>
                </Button>
            </div>
        </Container>
    );
};

export default CartPage;
