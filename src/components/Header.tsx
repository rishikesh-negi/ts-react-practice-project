import Button from "../ui/Button";

export default function Header() {
  return (
    <header id="main-header">
      <h1>ReactMentoring</h1>
      <nav>
        <ul>
          <Button to="/" textOnly={true}>
            Our Mission
          </Button>
          <Button to="/sessions" textOnly={true}>
            Browse Sessions
          </Button>
          <Button>Upcoming Sessions</Button>
        </ul>
      </nav>
    </header>
  );
}
