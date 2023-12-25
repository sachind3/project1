import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="py-4">
      <Container>
        <Button as={Link} to="/posts">
          View All Posts
        </Button>
      </Container>
    </section>
  );
};
export default Home;
