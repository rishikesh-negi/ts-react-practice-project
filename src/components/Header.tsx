import { useRef } from "react";
import Button from "../ui/Button";
import type { ModalApi } from "./Modal";
import Modal from "./Modal";
import UpcomingSessions from "./UpcomingSessions";

export default function Header() {
  const modalApiRef = useRef<ModalApi>(null);

  function handleOpenModal() {
    modalApiRef.current?.open();
  }

  return (
    <header id="main-header">
      <Modal ref={modalApiRef}>
        <UpcomingSessions modalApiRef={modalApiRef} />
      </Modal>
      <h1>ReactMentoring</h1>
      <nav>
        <ul>
          <Button to="/" textOnly={true}>
            Our Mission
          </Button>
          <Button to="/sessions" textOnly={true}>
            Browse Sessions
          </Button>
          <Button onClick={handleOpenModal}>Upcoming Sessions</Button>
        </ul>
      </nav>
    </header>
  );
}
