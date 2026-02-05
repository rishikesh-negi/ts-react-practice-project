import { useParams } from "react-router-dom";

import { useRef, useState } from "react";
import BookSessionForm from "../components/BookSessionForm.tsx";
import type { ModalApi } from "../components/Modal.tsx";
import Modal from "../components/Modal.tsx";
import { SESSIONS } from "../dummy-sessions.ts";
import Button from "../ui/Button.tsx";

export default function SessionPage() {
  const [showModal, setShowModal] = useState(false);
  const params = useParams<{ id: string }>();
  const modalApiRef = useRef<ModalApi>(null);

  const sessionId = params.id;
  const loadedSession = SESSIONS.find((session) => session.id === sessionId);

  if (!loadedSession) {
    return (
      <main id="session-page">
        <p>No session found!</p>
      </main>
    );
  }

  function handleOpenModal() {
    setShowModal(true);
    modalApiRef.current?.open();
  }

  return (
    <>
      <Modal ref={modalApiRef}>
        <BookSessionForm modalApiRef={modalApiRef} session={loadedSession} />
      </Modal>
      <main id="session-page">
        <article>
          <header>
            <img src={loadedSession.image} alt={loadedSession.title} />
            <div>
              <h2>{loadedSession.title}</h2>
              <time dateTime={new Date(loadedSession.date).toISOString()}>
                {new Date(loadedSession.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </time>
              <p>
                <Button onClick={handleOpenModal}>Book session</Button>
              </p>
            </div>
          </header>
          <p id="content">{loadedSession.description}</p>
        </article>
      </main>
    </>
  );
}
