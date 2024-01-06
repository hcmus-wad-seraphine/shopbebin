import { type Address } from "@prisma/client";
import { useState } from "react";

interface Props {
  address: Address;
  index: number;
  setDeletedAddressesIndex: (indices: number[]) => void;
  indices: number[];
}

const AddressRow = ({ address, index, setDeletedAddressesIndex, indices }: Props) => {
  const { unitNumber, street, district, city } = address;
  const [unitNumberState, setUnitNumberState] = useState<string>(unitNumber);
  const [streetState, setStreetState] = useState<string>(street);
  const [districtState, setDistrictState] = useState<string>(district);
  const [cityState, setCityState] = useState<string>(city);

  return (
    <div className="grid grid-cols-8 gap-4 font-semibold w-full">
      <input
        onChange={(text) => {
          setUnitNumberState(text.target.value);
        }}
        value={unitNumberState}
        className="col-span-1"
      />
      <input
        onChange={(text) => {
          setStreetState(text.target.value);
        }}
        value={streetState}
        className="col-span-2"
      />
      <input
        onChange={(text) => {
          setDistrictState(text.target.value);
        }}
        value={districtState}
        className="col-span-2"
      />
      <input
        onChange={(text) => {
          setCityState(text.target.value);
        }}
        value={cityState}
        className="col-span-2"
      />
      <button
        className="col-span-1"
        onClick={() => {
          setDeletedAddressesIndex([...indices, index]);
        }}
      >
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
};

export default AddressRow;
