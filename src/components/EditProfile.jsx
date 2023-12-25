import { doc, updateDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { Button, Card, Form, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import { useAuth } from "../context/Auth";
import { firestore } from "../firebase";
const EditProfile = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const formRef = useRef(null);
  const { currentUser, setCurrentUser } = useAuth();
  const [info, setInfo] = useState({
    fullName: currentUser?.fullName || "",
    userName: currentUser?.userName || "",
    email: currentUser?.email || "",
    bio: currentUser?.bio || "",
  });
  const handleSubmit = async (e) => {
    setIsSubmit(true);
    e.preventDefault();
    const docRef = doc(firestore, "users", currentUser.uid);
    await updateDoc(docRef, {
      fullName: info.fullName,
      bio: info.bio,
    })
      .then(() => {
        setCurrentUser({
          ...currentUser,
          fullName: info.fullName,
          bio: info.bio,
        });
        toast.success("Profile updated successfully");
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      })
      .finally(() => {
        setIsSubmit(false);
      });
  };
  const resetForm = (e) => {
    setInfo({
      fullName: currentUser?.fullName || "",
      userName: currentUser?.userName || "",
      email: currentUser?.email || "",
      bio: currentUser?.bio || "",
    });
  };
  return (
    <>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit} ref={formRef}>
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={info.fullName}
                onChange={(e) => setInfo({ ...info, fullName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={info.userName}
                onChange={(e) => setInfo({ ...info, userName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={info.email}
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
                readOnly
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="bio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={info.bio}
                onChange={(e) => setInfo({ ...info, bio: e.target.value })}
              />
            </Form.Group>
            <Stack direction="horizontal" gap={3}>
              <Button variant="primary" type="submit" disabled={isSubmit}>
                {isSubmit ? "Updating ..." : "Update"}
              </Button>
              <Button variant="secondary" type="button" onClick={resetForm}>
                Reset
              </Button>
            </Stack>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
export default EditProfile;
