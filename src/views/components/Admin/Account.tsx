import { type User } from "@prisma/client";
import { useState } from "react";
import Modal from "react-modal";

import AccounProfile from "./AccounProfile";

interface AccountProps {
  account: User;
  selectedAccounts: User[];
  setSelectedAccounts: (accounts: User[]) => void;
}

const Account = ({ account, selectedAccounts, setSelectedAccounts }: AccountProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const customStyles: Modal.Styles = {
    content: {
      display: "flex",
      flexDirection: "column",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "20px",
      width: 400,
      maxHeight: 400,
    },
  };

  return (
    <div className="justify-between items-center w-full">
      <Modal
        style={customStyles}
        isOpen={isModalOpen}
      >
        <AccounProfile
          account={account}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      </Modal>
      <div className="gap-2 items-center">
        <input
          type="checkbox"
          onChange={(isSelected) => {
            if (isSelected.target.checked) {
              setSelectedAccounts([...selectedAccounts, account]);
            }
          }}
        />
        <div className="justify-center items-center gap-2">
          <img
            className="w-10 h-10 rounded-full"
            src={account.avatar}
            alt=""
          />
          <p className="text-lg font-medium">{account.name}</p>
        </div>
      </div>
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
};

export default Account;
