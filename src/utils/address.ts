import { type Address } from "@prisma/client";

export const addressToString = (address: Address) => {
  return `${address.unitNumber} ${address.street}, ${address.district}, ${address.city}`;
};
