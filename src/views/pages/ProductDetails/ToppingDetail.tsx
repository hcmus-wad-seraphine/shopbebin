import { type Topping } from "@models/interface";
import Price from "@views/components/Price";
import { type FunctionComponent } from "react";

interface ToppingDetailProps {
  toppings: Topping[];
  selectedToppings: Topping[];
  setSelectedToppings: (toppings: Topping[]) => void;
}

const ToppingDetail: FunctionComponent<ToppingDetailProps> = ({
  toppings,
  selectedToppings,
  setSelectedToppings,
}) => {
  const handleSelectTopping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const toppingId = e.target.id;

    const topping = toppings.find((item) => item.id === toppingId);

    if (topping === undefined) return;

    if (e.target.checked) {
      setSelectedToppings([...selectedToppings, topping]);
    } else {
      setSelectedToppings(selectedToppings.filter((item) => item.id !== toppingId));
    }
  };

  return (
    <div className="flex-col gap-2">
      <label className="text-gray-500 text-base">Toppings</label>

      <div className="flex-col max-h-[240px] overflow-auto border border-gray-300 p-2 rounded-lg max-w-md">
        {toppings.map((item) => (
          <div
            key={item.id}
            className="justify-between w-full"
          >
            <div className="gap-2 items-center">
              <img
                src={item.topping.image}
                alt=""
                className="w-10 h-10 rounded-lg"
              />

              <div className="flex-col">
                <p>{item.topping.name}</p>
                <Price
                  num={item.topping.price}
                  numSize="12"
                />
              </div>
            </div>

            <input
              type="checkbox"
              id={item.id}
              name={item.id}
              defaultChecked={selectedToppings.includes(item)}
              onChange={handleSelectTopping}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToppingDetail;
