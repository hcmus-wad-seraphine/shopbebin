import { type ProductSize } from "@prisma/client";
import { type FunctionComponent } from "react";

interface ProductSizeProps {
  sizes: ProductSize[];
  size: ProductSize;
  onChangeSize: (size: ProductSize) => void;
}

const SizeDetail: FunctionComponent<ProductSizeProps> = ({ sizes, size, onChangeSize }) => {
  function handleSizeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const sizeId = event.target.value;
    const selectedSize = sizes.find((item) => item.id === sizeId);
    onChangeSize(selectedSize as ProductSize);
  }

  return (
    <div className="flex flex-col items-start space-y-1 flex-grow">
      <label className="text-gray-500 text-base">Size</label>
      <select
        id="size-selector"
        name="size-selector"
        onChange={handleSizeChange}
        defaultValue={size.id}
        className="form-select border border-gray-300 rounded-sm w-full text-gray-900 focus:border-secondary focus:ring-secondary max-w-xs"
      >
        {sizes.map((item) => (
          <option
            id={item.id}
            key={item.id}
            value={item.id}
          >
            {item.size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SizeDetail;
