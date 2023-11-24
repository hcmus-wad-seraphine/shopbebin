import Price from "@components/Price";
import { type ProductMetadata } from "@prisma/client";

const ProductInfo = (product: ProductMetadata) => {
  const { name, desc } = product;

  return (
    <div className="flex-col font-primary">
      <h1 className="leading-relaxed font-extrabold text-3xl text-primary py-2">{name}</h1>
      <p className="font-medium text-lg">{desc}</p>
      <div className="text-xl text-black font-medium py-2 px-1">
        <Price
          num={10}
          numSize="text-2xl"
        />
      </div>
    </div>
  );
};

export default ProductInfo;
