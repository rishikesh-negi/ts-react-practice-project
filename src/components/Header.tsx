import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import type { ModalApi } from "./Modal";
import Modal from "./Modal";
import UpcomingSessions from "./UpcomingSessions";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const modalApiRef = useRef<ModalApi>(null);
  const [pathname, setPathname] = useState(location.pathname);

  function handleOpenModal() {
    modalApiRef.current?.open();
  }

  useEffect(
    function () {
      setPathname(location.pathname);
    },
    [location],
  );

  return (
    <header id="main-header">
      <Modal ref={modalApiRef}>
        <UpcomingSessions modalApiRef={modalApiRef} />
      </Modal>
      <h1>ReactMentoring</h1>
      <nav>
        <ul>
          <Button
            to="/"
            textOnly={true}
            className={`${pathname === "/" ? "active" : ""}`}>
            Our Mission
          </Button>
          <Button
            to="/sessions"
            textOnly={true}
            className={`${pathname === "/sessions" ? "active" : ""}`}>
            Browse Sessions
          </Button>
          <Button onClick={handleOpenModal}>Upcoming Sessions</Button>
        </ul>
      </nav>
    </header>
  );
}
