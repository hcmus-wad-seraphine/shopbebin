import { type Address, type User } from "@prisma/client";
import { addressToString } from "@utils/address";
import { appState } from "@views/valtio";
import { useState } from "react";

import AddressRow from "./AddressRow";
import AddressTitleRow from "./AddressTitleRow";

type AddressMap = Record<string, Address>;

const handleChangeAddresses = (newAddresses: Address[]) => {
  const changeCurrentAddress = async () => {
    if (!appState.profile) return;

    const user: User = { ...appState.profile.user, addresses: newAddresses };

    await fetch("/api/profile/update", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${appState.profile.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    window.location.reload();
  };

  changeCurrentAddress().catch(console.error);
};

const emptyAddress: Address = {
  unitNumber: "",
  street: "",
  district: "",
  city: "",
};

const ManageAddress = () => {
  if (!appState.profile) return null;

  const defaultAddressMap: AddressMap = {};
  appState.profile.user.addresses.forEach((address) => {
    defaultAddressMap[addressToString(address)] = address;
  });

  const [addressMap, setAddressMap] = useState<AddressMap>(defaultAddressMap);
  const [newAddress, setNewAddress] = useState<Address>(emptyAddress);
  const [selectedKey, setSelectedKey] = useState<string>("");

  const handleSelectAddress = (key: string) => {
    setSelectedKey(key);
  };

  const handleAddAddress = () => {
    addressMap[addressToString(newAddress)] = newAddress;
    setNewAddress(emptyAddress);
  };

  const handleUpdateAddress = (key: string, address: Address) => {
    setAddressMap({ ...addressMap, [key]: address });
  };

  const handleDeleteAddress = (key: string) => {
    const newAddressMap = { ...addressMap };
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete newAddressMap[key];
    setAddressMap(newAddressMap);
  };

  const handleSave = () => {
    let newAddresses = Object.values(addressMap);

    if (selectedKey !== "" && addressMap[selectedKey]) {
      newAddresses = newAddresses.filter((address) => addressToString(address) !== selectedKey);
      newAddresses.unshift(addressMap[selectedKey]);
    }

    handleChangeAddresses(newAddresses);
  };

  return (
    <div className="flex-col gap-5">
      <div className="flex-col gap-2">
        <h1 className="text-lg font-medium text-secondary">Select current address</h1>
        <select
          className="w-full px-2 py-1 rounded-full border-2 border-primary"
          onChange={(event) => {
            handleSelectAddress(event.target.value);
          }}
        >
          {Object.keys(addressMap).map((address, index) => (
            <option
              className="w-full px-2 py-3 rounded-full border-2 border-primary"
              key={index}
              value={address}
            >
              {address}
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

        {Object.keys(addressMap).map((key) => (
          <AddressRow
            key={key}
            addressKey={key}
            address={addressMap[key]}
            onUpdateAddress={handleUpdateAddress}
            onDeleteAddress={handleDeleteAddress}
          />
        ))}
      </div>

      <button
        className="text-white bg-primary font-medium text-lg rounded-full py-2"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default ManageAddress;
