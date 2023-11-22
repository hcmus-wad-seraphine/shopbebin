import Button from "@components/Button";
import CheckoutItem from "@components/Checkout/CheckoutItem";
import Container from "@components/Container";
import Price from "@components/Price";
import { products } from "@components/internal";

const Checkout = () => {
    const total = products
        .slice(0, 5)
        .reduce((accumulator, currentValue) => accumulator + 10, 10);

    return (
        <Container isAdmin={false}>
            <div className="flex-col py-10 items-center">
                <div className="flex-col gap-2">
                    <div className="flex-col gap-5 h-[500px] overflow-scroll py-5 px-10 border border-black rounded-2xl">
                        {products.slice(0, 5).map((product) => (
                            <CheckoutItem key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="flex-col gap-2">
                        <div className="text-xl justify-between">
                            <p className="font-semibold uppercase text-primary">
                                Shipping fee
                            </p>
                            <Price num={10} numSize="20" />
                        </div>

                        <div className="text-xl justify-between">
                            <p className="font-semibold uppercase text-primary">
                                Total
                            </p>
                            <Price num={total} numSize="20" />
                        </div>
                    </div>
                    <div className="self-center">
                        <Button
                            href="/checkout"
                            style="max-w-[200px] self-center"
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Checkout;
