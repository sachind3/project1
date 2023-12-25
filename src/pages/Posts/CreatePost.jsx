import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { Button, Card, Container, Form, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { firestore } from "../../firebase";

const CreatePost = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [post, setPost] = useState({
    title: "",
    description: "",
    blogImage: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addDoc(collection(firestore, "posts"), {
      uid: currentUser.uid,
      title: post.title,
      shortTitle:
        post.title.length > 50 ? post.title.slice(0, 50) + "..." : post.title,
      description: post.description,
      shortDescription:
        post.description.length > 100
          ? post.description.slice(0, 100) + "..."
          : post.description,
      blogImage: post.blogImage,
      publish: false,
      timestamp: serverTimestamp(),
      createdBy: currentUser.uid,
    })
      .then(() => {
        setPost({ title: "", description: "", blogImage: "" });
        setLoading(false);
        navigate("/myposts");
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };
  return (
    <section className="py-4">
      <Container>
        <h4>Create a new post</h4>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Blog Title</Form.Label>
                <Form.Control
                  type="text"
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Blog Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="5"
                  value={post.description}
                  onChange={(e) =>
                    setPost({ ...post, description: e.target.value })
                  }
                />
              </Form.Group>
              <Stack direction="horizontal" gap={3}>
                <Button variant="primary" type="submit" disabled={isLoading}>
                  {isLoading ? "Loading…" : "Submit"}
                </Button>
              </Stack>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};
export default CreatePost;
