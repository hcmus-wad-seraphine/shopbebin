import Price from "@components/Price";

interface ProductInfoProps {
  name: string;
  desc: string;
  price: number;
}

const ProductInfo = ({ name, desc, price }: ProductInfoProps) => {
  return (
    <div className="flex-col font-primary">
      <h1 className="leading-relaxed font-extrabold text-3xl text-primary py-2">{name}</h1>
      <div className="text-xl text-black font-medium py-2 px-1">
        <Price
          num={price}
          numSize="text-2xl"
        />
      </div>
      <p className="font-medium text-lg py-2">{desc}</p>
    </div>
  );
};

export default ProductInfo;
