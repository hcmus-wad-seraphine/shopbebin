import { type FunctionComponent } from "react";

interface ProductQuantityProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const QuantityDetail: FunctionComponent<ProductQuantityProps> = ({ quantity, setQuantity }) => {
  const handleUpdateQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setQuantity(1);
    } else {
      setQuantity(Math.floor(event.target.valueAsNumber));
    }
  };

  return (
    <div className="flex flex-col items-start space-y-1 flex-grow-0">
      <label className="text-gray-500 text-base">Qty.</label>
      <input
        type="number"
        inputMode="numeric"
        id="quantity"
        name="quantity"
        min="1"
        step="1"
        value={quantity}
        onChange={handleUpdateQuantity}
        className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-secondary focus:ring-secondary"
      />
    </div>
  );
};

export default QuantityDetail;
