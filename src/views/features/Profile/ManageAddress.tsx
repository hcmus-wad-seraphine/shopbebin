import { type Address, type User } from "@prisma/client";
import { addressToString } from "@utils/address";
import { appActions, appState } from "@views/valtio";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";

import AddressRow from "./AddressRow";
import AddressTitleRow from "./AddressTitleRow";

const ManageAddress = () => {
  const { profile } = useSnapshot(appState);
  const { addresses } = profile?.user as User;

  const [items, setItems] = useState<string[]>([]);
  const [newAddress, setNewAddress] = useState<Address>({
    unitNumber: "",
    street: "",
    district: "",
    city: "",
  });
  const [deletedAddressesIndex, setDeletedAddressesIndex] = useState<number[]>([]);

  const handleUpdateProfile = async (user: User) => {
    await fetch("/api/profile/update", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${profile?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  const handleChangeCurrentAddress: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    if (!profile) return;

    const currentAddress = event.target.value;
    const addressStrings = addresses.map((address) => addressToString(address));
    const index = addressStrings.indexOf(currentAddress);
    const newAddresses = Array.from(addresses);
    newAddresses.splice(index, 1);
    newAddresses.unshift(addresses[index]);

    const user: User = { ...(profile.user as User), addresses: newAddresses };

    appActions.updateProfile(user);
    handleUpdateProfile(user).catch((err) => {
      console.log(err);
    });
  };

  const handleAddAddress = () => {
    if (!profile) return;

    setItems([addressToString(newAddress), ...items]);

    const newAddresses = [...Array.from(addresses), newAddress];
    const user: User = { ...(profile.user as User), addresses: newAddresses };

    appActions.updateProfile(user);
    handleUpdateProfile(user).catch((err) => {
      console.log(err);
    });
  };

  const handleRemoveAddress = () => {
    if (!profile) return;

    const newAddresses = Array.from(addresses).filter(
      (address, index) => !deletedAddressesIndex.includes(index),
    );
    const user: User = { ...(profile.user as User), addresses: newAddresses };

    appActions.updateProfile(user);
    handleUpdateProfile(user).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    setItems(addresses.map((address) => addressToString(address)));
  }, []);

  return (
    <div className="flex-col gap-5">
      <div className="flex-col gap-2">
        <h1 className="text-lg font-medium text-secondary">Select current address</h1>
        <select
          className="w-full px-2 py-1 rounded-full border-2 border-primary"
          onChange={handleChangeCurrentAddress}
          name="address"
          id="address"
        >
          {items.map((item, index) => (
            <option
              className="w-full px-2 py-3 rounded-full border-2 border-primary"
              key={index}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-col gap-2">
        <h1 className="text-lg font-medium text-secondary">Add address</h1>
        <div className="gap-1 flex-col">
          <input
            placeholder="Number"
            className="w-full border-2 border-primary rounded-xl px-2 py-1"
            onChange={(text) => {
              setNewAddress({ ...newAddress, unitNumber: text.target.value });
            }}
          />
          <input
            placeholder="Street"
            className="w-full border-2 border-primary rounded-xl px-2 py-1"
            onChange={(text) => {
              setNewAddress({ ...newAddress, street: text.target.value });
            }}
          />
          <input
            placeholder="District"
            className="w-full border-2 border-primary rounded-xl px-2 py-1"
            onChange={(text) => {
              setNewAddress({ ...newAddress, district: text.target.value });
            }}
          />
          <input
            placeholder="City"
            className="w-full border-2 border-primary rounded-xl px-2 py-1"
            onChange={(text) => {
              setNewAddress({ ...newAddress, city: text.target.value });
            }}
          />
          <button
            className="bg-primary px-8 py-2 rounded-full text-white"
            onClick={handleAddAddress}
          >
            <i className="fa-solid fa-plus text-white"></i>
          </button>
        </div>
      </div>

      <div className="flex-col gap-2 w-full mb-10">
        <h1 className="text-lg font-medium text-secondary">Update address</h1>
        <AddressTitleRow />
        {addresses.map((item, index) => {
          if (deletedAddressesIndex.includes(index)) return null;

          return (
            <AddressRow
              key={index}
              address={item}
              index={index}
              setDeletedAddressesIndex={setDeletedAddressesIndex}
              indices={deletedAddressesIndex}
            />
          );
        })}
      </div>

      <button
        className="text-white bg-primary font-medium text-lg rounded-full py-2"
        onClick={handleRemoveAddress}
      >
        Save
      </button>
    </div>
  );
};

export default ManageAddress;
