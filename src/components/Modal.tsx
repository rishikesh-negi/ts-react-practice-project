import {
  useImperativeHandle,
  useRef,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  ref: Ref<ModalApi>;
  children: ReactNode;
};

export type ModalApi = {
  open: () => void;
  closeModal: () => void;
};

export default function Modal({ ref, children, ...props }: ModalProps) {
  const modalDialogRef = useRef<HTMLDialogElement | null>(null);

  useImperativeHandle(ref, () => ({
    open() {
      modalDialogRef.current?.showModal();
    },
    closeModal() {
      modalDialogRef.current?.close();
    },
  }));

  function handleOutsideClick(e: MouseEvent) {
    const modalElement = document.querySelector(".modal");
    if (e.target === modalElement) modalDialogRef.current?.close();
  }

  return createPortal(
    <dialog
      className="modal"
      {...props}
      ref={modalDialogRef}
      onClick={handleOutsideClick}>
      {children}
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
