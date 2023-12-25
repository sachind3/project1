import { Button, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyPostCard = ({ item, deletePost }) => {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title className="mb-0">{item.shortTitle}</Card.Title>
          <Card.Text className="small text-body-secondary mb-1">
            {new Date(item.timestamp.toDate()).toLocaleString()}
          </Card.Text>
          <Card.Text className="small">{item.shortDescription}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Stack direction="horizontal" gap={2}>
            <Button
              variant="outline-primary"
              size="sm"
              as={Link}
              to={`/editpost/${item.id}`}
            >
              Edit
            </Button>
            <Button size="sm">Publish</Button>
            <Button
              variant="danger"
              size="sm"
              to="/"
              className="ms-auto"
              onClick={(e) => deletePost(item.id)}
            >
              Delete
            </Button>
          </Stack>
        </Card.Footer>
      </Card>
    </>
  );
};
export default MyPostCard;
