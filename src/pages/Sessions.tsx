import type { Session } from "../context/BookedSessionsContext.tsx";
import { SESSIONS } from "../dummy-sessions.ts";
import Button from "../ui/Button.tsx";

export default function SessionsPage() {
  const sessions: Session[] = SESSIONS;

  return (
    <main id="sessions-page">
      <header>
        <h2>Available mentoring sessions</h2>
        <p>
          From an one-on-one introduction to React's basics all the way up to a
          deep dive into state mechanics - we got just the right session for
          you!
        </p>
      </header>
      {sessions.length > 0 ? (
        <ul id="sessions-list">
          {sessions.map((session) => (
            <li className="session-item" key={session.id}>
              <img
                src={session.image}
                alt={`Illusrtation for ${session.title}`}
              />
              <div className="session-data">
                <h3>{session.title}</h3>
                <p>{session.summary}</p>
                <aside className="actions">
                  <Button to={`/sessions/${session.id}`}>Learn More</Button>
                </aside>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <span>No session currently available 😔</span>
      )}
    </main>
  );
}
