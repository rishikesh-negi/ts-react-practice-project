import { useBookedSessionsContext } from "../context/BookedSessionsContext.tsx";
import Button from "../ui/Button.tsx";

export default function SessionsPage() {
  const { sessions } = useBookedSessionsContext();

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
      {sessions.length ? (
        <ul id="sessions-list">
          {sessions.map((session) => (
            <li className="session-item" key={session.id}>
              <img
                src={session.image}
                alt={`Illusrtation for ${session.title}`}
              />
              <div className="session-data">
                <h3>{session.title}</h3>
                <p>{session.description}</p>
              </div>
              <aside className="actions">
                <Button>Learn More</Button>
              </aside>
            </li>
          ))}
        </ul>
      ) : (
        <span>No session currently available 😔</span>
      )}
    </main>
  );
}
