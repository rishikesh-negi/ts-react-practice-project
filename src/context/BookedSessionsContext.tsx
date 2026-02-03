import { createContext, useContext, useReducer, type ReactNode } from "react";

type Session = {
  id: string;
  title: string;
  summary: string;
  description: string;
  duration: number;
  date: string;
  image: string;
};

type BookedSessionsState = {
  sessions: Session[];
};

type BookedSessionsContextValue = BookedSessionsState & {
  bookSession: (session: Session) => void;
  cancelSession: (id: string) => void;
};

type BookedSessionsProviderProps = {
  children: ReactNode;
};

type BookSessionAction = { type: "BOOK_SESSION"; payload: Session };
type CancelSessionAction = { type: "CANCEL_SESSION"; payload: string };

type BookedSessionsAction = BookSessionAction | CancelSessionAction;

const BookedSessionsContext = createContext<BookedSessionsContextValue | null>(
  null,
);

const bookedSessionsInitialState: BookedSessionsState = {
  sessions: [],
};

export default function BookedSessionsProvider({
  children,
}: BookedSessionsProviderProps) {
  const [bookedSessionsState, dispatch] = useReducer(
    bookedSessionsReducer,
    bookedSessionsInitialState,
  );

  const ctx: BookedSessionsContextValue = {
    sessions: bookedSessionsState.sessions,
    bookSession(session) {
      dispatch({ type: "BOOK_SESSION", payload: session });
    },
    cancelSession(id) {
      dispatch({ type: "CANCEL_SESSION", payload: id });
    },
  };

  return (
    <BookedSessionsContext.Provider value={ctx}>
      {children}
    </BookedSessionsContext.Provider>
  );
}

function bookedSessionsReducer(
  state: BookedSessionsState,
  action: BookedSessionsAction,
): BookedSessionsState {
  switch (action.type) {
    case "BOOK_SESSION":
      return { ...state, sessions: [...state.sessions, action.payload] };
    case "CANCEL_SESSION":
      return {
        ...state,
        sessions: state.sessions.filter(
          (session) => session.id !== action.payload,
        ),
      };
    default:
      throw new Error(`Unknown action type: ${action as never}`);
  }
}

export function useBookedSessionsContext() {
  const bookedSessionsContext = useContext(BookedSessionsContext);

  if (bookedSessionsContext === null)
    throw new Error("Context was used outside its provider");

  return bookedSessionsContext;
}
