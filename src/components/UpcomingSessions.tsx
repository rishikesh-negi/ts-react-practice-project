import type { RefObject } from "react";
import { useBookedSessionsContext } from "../context/BookedSessionsContext";
import Button from "../ui/Button";
import type { ModalApi } from "./Modal";

type UpcomingSessionsProps = {
  modalApiRef: RefObject<ModalApi | null>;
};

export default function UpcomingSessions({
  modalApiRef,
}: UpcomingSessionsProps) {
  const { sessions, cancelSession } = useBookedSessionsContext();

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  function handleCloseModal() {
    modalApiRef.current?.closeModal();
  }

  return (
    <div>
      <h2>Upcoming Sessions</h2>
      {sessions.length > 0 ? (
        <>
          <ul>
            {sessions.map((session) => (
              <li className="upcoming-session" key={session.id}>
                <div>
                  <h3>{session.title}</h3>
                  <p>{session.summary}</p>
                  <time dateTime={session.date}>
                    {dateFormatter.format(new Date(session.date))}
                  </time>
                </div>
                <div className="actions">
                  <Button
                    textOnly={true}
                    onClick={() => cancelSession(session.id)}>
                    Cancel
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="actions">
            <Button onClick={handleCloseModal}>Close</Button>
          </div>
        </>
      ) : (
        <div className="upcoming-session">
          <p>You haven't booked any sessions yet.</p>
          <div className="actions">
            <Button
              to="/sessions"
              onClick={() => modalApiRef.current?.closeModal()}>
              Browse Sessions
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
