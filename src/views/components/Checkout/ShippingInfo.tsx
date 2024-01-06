import { type Address } from "@prisma/client";
import { addressToString } from "@utils/address";
import { type FC } from "react";

import InfoItem from "./InfoItem";

export interface ShippingInfoProps {
  address: Address;
  name: string;
  phone: string;
}

const ShippingInfo: FC<ShippingInfoProps> = ({ name, phone, address }) => {
  return (
    <div className="flex-col w-full max-w-3xl px-8">
      <h1 className="text-primary uppercase font-semibold text-xl">Shipping Info</h1>

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
