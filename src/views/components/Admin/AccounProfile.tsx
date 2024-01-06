import { type User } from "@prisma/client";

import InfoItem from "../Checkout/InfoItem";

interface Props {
  account: User;
  onClose: () => void;
}

const AccounProfile = ({ account, onClose }: Props) => {
  const { name, avatar } = account;

  return (
    <div className="flex-col w-full">
      <button
        onClick={onClose}
        className="self-end"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
      <div className="flex-col justify-center items-center gap-4">
        <img
          src={avatar}
          alt="avatar"
          className="w-[200px] h-[200px] rounded-full object-cover"
        />

        <p className="text-xl font-semibold">{name}</p>
      </div>

      <div className="flex-col justify-center items-center gap-4 w-full">
        <InfoItem
          title="Email"
          value={account.email}
        />
        <InfoItem
          title="Phone number"
          value={account.phone}
        />
      </div>
    </div>
  );
};

export default AccounProfile;
