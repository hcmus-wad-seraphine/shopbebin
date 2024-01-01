import { type Address } from "@prisma/client";
import { type FC } from "react";

import InfoItem from "./InfoItem";

const addressToString = (address: Address) => {
  return address.unitNumber + address.street + address.district + address.city;
};

export interface ShippingInfoProps {
  address: Address;
  name: string;
  phone: string;
}

const ShippingInfo: FC<ShippingInfoProps> = ({ name, phone, address }) => {
  return (
    <div className="flex-col w-full max-w-3xl px-8">
      <div className="justify-between text-primary">
        <h1 className="text-primary uppercase font-semibold text-xl">Shipping Info</h1>

        <a className="items-center gap-2">
          <i className="fa-regular fa-pen-to-square text-primary"></i>
          Edit
        </a>
      </div>

      <div className="flex-col">
        <InfoItem
          title="Name"
          value={name}
        />

        <InfoItem
          title="Phone number"
          value={phone}
        />

        <InfoItem
          title="Address"
          value={addressToString(address)}
        />
      </div>
    </div>
  );
};

export default ShippingInfo;
