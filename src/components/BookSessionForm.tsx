import {
  useRef,
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type RefObject,
  type SubmitEvent,
} from "react";
import Input from "../ui/Input";
import type { ModalApi } from "./Modal";
import Button from "../ui/Button";
import {
  useBookedSessionsContext,
  type Session,
} from "../context/BookedSessionsContext";

type BookSessionFormProps = ComponentPropsWithoutRef<"form"> & {
  modalApiRef: RefObject<ModalApi | null>;
  session: Session;
};

export default function BookSessionForm({
  modalApiRef,
  session,
  ...props
}: BookSessionFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { bookSession, sessions } = useBookedSessionsContext();
  const alreadyBooked = sessions.some((sess) => sess.id === session.id);

  function handleCloseModal(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    formRef.current?.reset();
    modalApiRef?.current?.closeModal();
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    if (!data.sessionBookerName || !data.sessionBookerEmail)
      throw new Error("Name and email are requried to book the session");

    if (alreadyBooked) throw new Error("You have already booked this session");

    bookSession(session);
    formRef.current?.reset();
    modalApiRef.current?.closeModal();
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} {...props}>
      <h3>Book Session</h3>
      <Input
        label="You name"
        type="text"
        id="session-booker-name"
        name="sessionBookerName"
      />
      <Input
        label="Your email"
        type="text"
        id="session-booker-email"
        name="sessionBookerEmail"
      />
      <div className="actions">
        <Button textOnly={true} onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button>Book Session</Button>
      </div>
    </form>
  );
}
