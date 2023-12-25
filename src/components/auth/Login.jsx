import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { auth, firestore } from "../../firebase";

const Login = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cred = await signInWithEmailAndPassword(
        auth,
        info.email,
        info.password
      );
      if (cred) {
        const docRef = doc(firestore, "users", cred.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={info.email}
            onChange={(e) => setInfo({ ...info, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={info.password}
            onChange={(e) => setInfo({ ...info, password: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="d-block w-100">
          Submit
        </Button>
      </Form>
    </>
  );
};
export default Login;
