import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import BookedSessionsProvider from "../context/BookedSessionsContext";

export default function Root() {
  return (
    <>
      <Header />
      <BookedSessionsProvider>
        <Outlet />
      </BookedSessionsProvider>
    </>
  );
}
