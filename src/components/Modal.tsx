import {
  useImperativeHandle,
  useRef,
  type ElementType,
  type ReactNode,
  type Ref,
} from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  ref: Ref<ModalApi>;
  children: ReactNode;
};

type ModalApi = {
  open: () => void;
};

export default function Modal({ ref, children, ...props }: ModalProps) {
  const modalDialogRef = useRef<HTMLDialogElement | null>(null);

  useImperativeHandle(ref, () => ({
    open() {
      modalDialogRef.current?.showModal();
    },
  }));

  return createPortal(
    <dialog className="modal" {...props} ref={modalDialogRef}>
      {children}
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
