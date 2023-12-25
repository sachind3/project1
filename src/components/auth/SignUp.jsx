import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { auth, firestore } from "../../firebase";

const SignUp = () => {
  const [info, setInfo] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("userName", "==", info.userName));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      toast.error("Username already exists");
      return;
    }
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        info.email,
        info.password
      );
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: info.email,
          userName: info.userName,
          fullName: info.fullName,
          bio: "",
          profilePicURL: "",
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
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
export default SignUp;
