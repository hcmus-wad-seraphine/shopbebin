import { type Address } from "@prisma/client";

interface Props {
  addressKey: string;
  address: Address;
  onUpdateAddress: (addressKey: string, address: Address) => void;
  onDeleteAddress: (addressKey: string) => void;
}

const AddressRow = ({ addressKey, address, onUpdateAddress, onDeleteAddress }: Props) => {
  return (
    <div className="grid grid-cols-8 gap-4 font-semibold w-full">
      <input
        onChange={(e) => {
          onUpdateAddress(addressKey, { ...address, unitNumber: e.target.value });
        }}
        value={address.unitNumber}
        className="col-span-1"
      />
      <input
        onChange={(e) => {
          onUpdateAddress(addressKey, { ...address, street: e.target.value });
        }}
        value={address.street}
        className="col-span-2"
      />
      <input
        onChange={(e) => {
          onUpdateAddress(addressKey, { ...address, district: e.target.value });
        }}
        value={address.district}
        className="col-span-2"
      />
      <input
        onChange={(e) => {
          onUpdateAddress(addressKey, { ...address, city: e.target.value });
        }}
        value={address.city}
        className="col-span-2"
      />
      <button
        className="col-span-1"
        onClick={() => {
          onDeleteAddress(addressKey);
        }}
      >
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
};

export default AddressRow;
