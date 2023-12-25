import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Card, Container, Form, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { firestore } from "../../firebase";

const EditPost = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [post, setPost] = useState({
    title: "",
    description: "",
    blogImage: "",
  });
  useEffect(() => {
    const checkPostExit = async () => {
      const postRef = doc(firestore, "posts", id);
      const postSnap = await getDoc(postRef);
      if (!postSnap.exists()) {
        navigate("/");
      }
      const postDoc = postSnap.data();
      if (postDoc.createdBy !== currentUser.uid) {
        navigate("/");
      } else {
        setPost({
          title: postDoc.title,
          description: postDoc.description,
          blogImage: postDoc.blogImage,
        });
      }
    };
    checkPostExit();
  }, [id, navigate, currentUser.uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    const docRef = doc(firestore, "posts", id);
    await updateDoc(docRef, {
      title: post.title,
      shortTitle:
        post.title.length > 50 ? post.title.slice(0, 50) + "..." : post.title,
      description: post.description,
      shortDescription:
        post.description.length > 100
          ? post.description.slice(0, 100) + "..."
          : post.description,
      blogImage: post.blogImage,
    })
      .then(() => {
        toast.success("Post updated successfully");
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      })
      .finally(() => {
        setIsSubmit(false);
        navigate("/myposts");
      });
  };
  return (
    <section className="py-4">
      <Container>
        <h4>Edit a post</h4>
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
                <Button variant="primary" type="submit" disabled={isSubmit}>
                  {isSubmit ? "Loading…" : "Submit"}
                </Button>
              </Stack>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};
export default EditPost;
