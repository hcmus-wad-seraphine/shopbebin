import { type FC } from "react";

interface ModalActionsProps {
  actionName: string;
  onAction: () => void;
  closeModal: () => void;
}

export const ModalActions: FC<ModalActionsProps> = ({ actionName, onAction, closeModal }) => {
  return (
    <div className="flex gap-2 justify-center">
      <button
        className="px-2 py-1 min-w-[120px] border border-slate-500 rounded-md hover:bg-slate-500 hover:text-white transition"
        onClick={closeModal}
      >
        Cancel
      </button>

      <button
        className="px-2 py-1 min-w-[120px] border border-primary rounded-md hover:bg-primary hover:text-white transition"
        onClick={onAction}
      >
        {actionName}
      </button>
    </div>
  );
};

export default ModalActions;
