import { type FC } from "react";

interface ModalHeaderProps {
  title: string;
  closeModal: () => void;
}

export const ModalHeader: FC<ModalHeaderProps> = ({ title, closeModal }) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="h-4 w-4" />
      <h2 className="text-lg font-semibold text-primary">{title}</h2>
      <i
        className="fa-solid fa-times text-slate-500 hover:text-primary text-base h-4 w-4 hover:cursor-pointer transition"
        onClick={closeModal}
      />
    </div>
  );
};

export default ModalHeader;
