import { type ShopbebinProduct } from "@models/interface";
import { Size, type ToppingMetadata } from "@prisma/client";
import { generateMongoObjectId } from "@utils/objectId";
import { appState } from "@views/valtio";
import { type FC, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

interface ProductBuilderProps {
  defaultProduct: ShopbebinProduct;
  buildButtonText: string;
  categories: string[];
  toppings: ToppingMetadata[];
  onBuild: (product: ShopbebinProduct) => void;
}

const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];

type ImageMap = Record<string, File | null>;

const ProductBuilder: FC<ProductBuilderProps> = ({
  defaultProduct,
  buildButtonText,
  categories,
  toppings,
  onBuild,
}) => {
  const [product, setProduct] = useState<ShopbebinProduct>(defaultProduct);
  const [imageMaps, setImageMaps] = useState<ImageMap>(
    Object.fromEntries(defaultProduct.images.map((image) => [image, null])),
  );

  const currentSizes = product.availableSizes.map((size) => size.size);

  const handleBuild = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!product) {
      return;
    }

    const build = async () => {
      const imagesToUpload: File[] = [];
      const images: string[] = [];

      for (const url of Object.keys(imageMaps)) {
        if (imageMaps[url] === null) {
          images.push(url);
        } else {
          imagesToUpload.push(imageMaps[url] as File);
        }
      }

      if (imagesToUpload.length > 0) {
        const formData = new FormData();
        for (const image of imagesToUpload) {
          formData.append("product-images", image);
        }

        const res = await fetch(`/api/upload/product-images/${product.id}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${appState.profile?.token}`,
          },
          body: formData,
        });

        const imageUrls = await res.json();
        images.push(...imageUrls.urls);
      }

      const newProduct: ShopbebinProduct = {
        ...product,
        images,
      };

      onBuild(newProduct);
    };

    build().catch(console.error);
  };

  const id = product?.id ?? generateMongoObjectId();

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

  const handleChangeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = e.target.value as Size;

    if (e.target.checked) {
      setProduct({
        ...product,
        availableSizes: [
          ...product.availableSizes,
          {
            id: generateMongoObjectId(),
            size,
            price: 0,
            productMetadataId: product.id,
            stock: 0,
          },
        ],
      });
    } else {
      setProduct({
        ...product,
        availableSizes: product.availableSizes.filter(
          (availableSize) => availableSize.size !== size,
        ),
      });
    }
  };

  const handleImagesChange = (files: File[]) => {
    if (!files) {
      return;
    }

    const newImageMaps = { ...imageMaps };

    for (const file of files) {
      const url = URL.createObjectURL(file);
      newImageMaps[url] = file;
    }

    setImageMaps(newImageMaps);
  };

  const handleSizePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = e.target.id.split("-")[2] as Size;

    setProduct({
      ...product,
      availableSizes: product.availableSizes.map((availableSize) => {
        if (availableSize.size === size) {
          return {
            ...availableSize,
            price: Number(e.target.value),
          };
        }

        return availableSize;
      }),
    });
  };

  const handleSizeStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = e.target.id.split("-")[2] as Size;

    setProduct({
      ...product,
      availableSizes: product.availableSizes.map((availableSize) => {
        if (availableSize.size === size) {
          return {
            ...availableSize,
            stock: Number(e.target.value),
          };
        }

        return availableSize;
      }),
    });
  };

  const handleToppingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const toppingId = e.target.id.split("-")[2];

    if (e.target.checked) {
      const topping = toppings.find((topping) => topping.id === toppingId);

      if (!topping) {
        return;
      }

      setProduct({
        ...product,
        availableToppings: [
          ...product.availableToppings,
          {
            id: generateMongoObjectId(),
            productMetadataId: product.id,
            toppingMetadataId: toppingId,
            topping,
          },
        ],
      });
    } else {
      setProduct({
        ...product,
        availableToppings: product.availableToppings.filter(
          (availableTopping) => availableTopping.id !== toppingId,
        ),
      });
    }
  };

  return (
    <form
      encType="multipart/form-data"
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
          htmlFor={`${id}-images`}
          className="col-span-1"
        >
          Images
        </label>

        <div className="flex-col gap-2 col-span-3">
          <FileUploader
            multiple={true}
            handleChange={handleImagesChange}
            name="product-images"
            types={fileTypes}
          />

          <div className="flex flex-row gap-2 overflow-x-scroll max-w-[400px]">
            {Object.keys(imageMaps).map((url, idx) => (
              <div
                key={url}
                className="flex-col justify-center items-center gap-2"
              >
                <img
                  src={url}
                  alt="product"
                  className="w-24 h-24 object-cover"
                />

                {Object.keys(imageMaps).length > 1 && (
                  <button
                    className="rounded-full bg-primary px-2 py-1 text-sm text-white hover:bg-secondary transition"
                    type="button"
                    onClick={() => {
                      const newImageMaps = { ...imageMaps };
                      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                      delete newImageMaps[url];
                      setImageMaps(newImageMaps);
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <label
          htmlFor={`${id}-sizes`}
          className="col-span-1"
        >
          Sizes
        </label>
        <div className="col-span-3 flex flex-col gap-8">
          {Object.values(Size).map((size) => (
            <div
              key={size}
              className="flex items-center gap-8"
            >
              <div className="flex-row items-center gap-2">
                <input
                  type="checkbox"
                  id={`${id}-size-${size}`}
                  checked={currentSizes.includes(size) ?? false}
                  value={size}
                  onChange={handleChangeSize}
                />
                <label htmlFor={`${id}-size-${size}`}>{size}</label>
              </div>

              <div className="flex-row items-center gap-2">
                <label htmlFor={`${id}-size-${size}-price`}>Price</label>
                <span> +</span>
                <input
                  type="number"
                  className="w-16"
                  id={`${id}-size-${size}-price`}
                  value={
                    product.availableSizes.find((availableSize) => availableSize.size === size)
                      ?.price ?? 0
                  }
                  min={0}
                  onChange={handleSizePriceChange}
                />
                <span>$</span>
              </div>

              <div className="flex-row items-center gap-2">
                <label htmlFor={`${id}-size-${size}-stock`}>Stock</label>
                <input
                  type="number"
                  className="w-16"
                  id={`${id}-size-${size}-stock`}
                  value={
                    product.availableSizes.find((availableSize) => availableSize.size === size)
                      ?.stock ?? 0
                  }
                  min={0}
                  onChange={handleSizeStockChange}
                />
              </div>
            </div>
          ))}
        </div>

        <label
          htmlFor={`${id}-toppings`}
          className="col-span-1"
        >
          Toppings
        </label>
        <div className="col-span-3 flex flex-col gap-2 max-h-[200px] overflow-y-scroll">
          {toppings.map((topping) => (
            <div
              key={topping.id}
              className="flex flex-row items-center gap-2"
            >
              <input
                type="checkbox"
                id={`${id}-topping-${topping.id}`}
                checked={
                  product.availableToppings.find(
                    (availableTopping) => availableTopping.topping.id === topping.id,
                  ) !== undefined
                }
                onChange={handleToppingChange}
              />
              <label htmlFor={`${id}-topping-${topping.id}`}>{topping.name}</label>
            </div>
          ))}
        </div>
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
