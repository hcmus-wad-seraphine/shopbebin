import { type User } from "@prisma/client";
import { appState } from "@views/valtio";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";

const ManageAddress = () => {
  const [items, setItems] = useState<string[]>([]);
  const [newAddress, setNewAddress] = useState<string>("");
  const { profile } = useSnapshot(appState);
  const { addresses } = profile?.user as User;

  useEffect(() => {
    const strings = addresses.map((address) => {
      let str = "";
      str = `${address.unitNumber} ${address.street}, ${address.district}`;
      return str;
    });
    setItems(["address1", "address2", "address3", ...strings]);
  }, []);

  const handleAddAddress = () => {
    setItems([newAddress, ...items]);
  };

  return (
    <div className="flex-col">
      <h1>Select current address</h1>
      <select
        name="address"
        id="address"
      >
        {items.map((item, index) => (
          <option
            className="w-full px-5 py-3 rounded-full border-2 border-primary"
            key={index}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>

      <h1>Add address</h1>
      <div className="gap-1">
        <input
          className="w-full border-2 border-primary rounded-xl"
          onChange={(text) => {
            setNewAddress(text.target.value);
          }}
        />
        <button onClick={handleAddAddress}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default ManageAddress;
