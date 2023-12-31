import { type ReactNode, useState } from "react";
import Modal from "react-modal";

interface SettingItemProps {
  title: string;
  icon: string;
  component?: ReactNode;
}

export const SettingItem = ({ title, icon, component }: SettingItemProps) => {
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
    },
  };

  return (
    <div className="w-full">
      <Modal
        isOpen={isModalOpen}
        style={customStyles}
      >
        <div className="justify-between items-center">
          <h1 className="text-primary text-xl font-semibold">{title}</h1>
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            <i className="fa-solid fa-xmark text-2xl text-primary"></i>
          </button>
        </div>
        <div className="bg-gray-500 w-[full] h-[1px] mb-4 mt-4"></div>
        {component}
      </Modal>

      <button
        className="flex w-full justify-between"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <div className="flex items-center gap-2">
          <i className={`fa-solid fa-${icon}`}></i>
          <h3 className=" text-base font-medium">{title}</h3>
        </div>

        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
};

const SettingTitle = () => {
  return (
    <div className="justify-center items-center gap-2">
      <i className="fa-solid fa-gear text-white"></i>
      <h2 className="text-white text-lg font-medium">Settings</h2>
    </div>
  );
};

export default SettingTitle;
