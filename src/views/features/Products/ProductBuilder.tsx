import { type ShopbebinProduct } from "@models/interface";
import { type ProductSize, Size, type ToppingMetadata } from "@prisma/client";
import { generateMongoObjectId } from "@utils/objectId";
import { type FC, useState } from "react";

interface ProductBuilderProps {
  defaultProduct: ShopbebinProduct;
  buildButtonText: string;
  categories: string[];
  toppings: ToppingMetadata[];
  onBuild: (product: ShopbebinProduct) => void;
}

const ProductBuilder: FC<ProductBuilderProps> = ({
  defaultProduct,
  buildButtonText,
  categories,
  toppings,
  onBuild,
}) => {
  const [product, setProduct] = useState<ShopbebinProduct>(defaultProduct);

  const handleBuild = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!product) {
      return;
    }

    onBuild(product);
  };

  const id = product?.id ?? generateMongoObjectId();
  const allAvailableSizes = defaultProduct?.availableSizes ?? [];
  const sizeNames = product.availableSizes.map((size) => size.size);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      name: e.target.value,
    });
  };

  const handleChangeDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProduct({
      ...product,
      desc: e.target.value,
    });
  };

  const handleChangeBasePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      basePrice: Number(e.target.value),
    });
  };

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct({
      ...product,
      category: e.target.value,
    });
  };

  const handleChangeSizes = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedSizeNames: string[] = [];

    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (option.selected) {
        selectedSizeNames.push(option.value);
      }
    }

    const selectedSizes = selectedSizeNames
      .map((sizeName) => {
        const size = allAvailableSizes.find((size) => size.size === sizeName);
        if (!size) {
          return null;
        }

        return size;
      })
      .filter((size) => size !== null) as ProductSize[];

    setProduct({
      ...product,
      availableSizes: selectedSizes,
    });
  };

  return (
    <form
      className="flex flex-col justify-center items-center gap-8"
      onSubmit={handleBuild}
    >
      <div className="grid grid-cols-4 gap-4">
        <label
          htmlFor={`${id}-id`}
          className="col-span-1"
        >
          ID
        </label>
        <input
          className="col-span-3"
          type="text"
          value={id}
          disabled
          id={`${id}-id`}
        />

        <label
          htmlFor={`${id}-name`}
          className="col-span-1"
        >
          Name
        </label>
        <input
          className="col-span-3"
          type="text"
          value={product?.name ?? ""}
          onChange={handleChangeName}
          id={`${id}-name`}
        />

        <label
          htmlFor={`${id}-desc`}
          className="col-span-1"
        >
          Description
        </label>
        <textarea
          className="col-span-3"
          value={product?.desc ?? ""}
          onChange={handleChangeDesc}
          id={`${id}-desc`}
          rows={4}
        />

        <label
          htmlFor={`${id}-base-price`}
          className="col-span-1"
        >
          Base Price
        </label>
        <input
          className="col-span-3"
          type="number"
          value={product?.basePrice ?? 0}
          min={0}
          onChange={handleChangeBasePrice}
          id={`${id}-base-price`}
        />

        <label
          htmlFor={`${id}-category`}
          className="col-span-1"
        >
          Category
        </label>
        <select
          className="col-span-3"
          value={product?.category ?? ""}
          onChange={handleChangeCategory}
          id={`${id}-category`}
        >
          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

        <label
          htmlFor={`${id}-sizes`}
          className="col-span-1"
        >
          Sizes
        </label>
        <select
          multiple
          className="col-span-3"
          value={sizeNames}
          onChange={handleChangeSizes}
          id={`${id}-sizes`}
        >
          {Object.values(Size).map((size) => (
            <option
              key={size}
              value={size}
            >
              {size}
            </option>
          ))}
        </select>

        <label
          htmlFor={`${id}-toppings`}
          className="col-span-1"
        >
          Toppings
        </label>
      </div>

      <button
        className="rounded-full bg-primary px-5 py-2 text-white hover:bg-secondary transition"
        type="submit"
      >
        {buildButtonText}
      </button>
    </form>
  );
};

export default ProductBuilder;
