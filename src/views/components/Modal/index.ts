import type Modal from "react-modal";

export { ModalActions } from "./Actions";
export { ModalHeader } from "./Header";

export const modalStyles: Modal.Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 32,
    minWidth: "50vw",
  },
};
