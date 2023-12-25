import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { auth, firestore } from "../../firebase";

const GoogleAuth = () => {
  const handleSubmit = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const cred = await signInWithPopup(auth, provider);
      if (cred) {
        const userRef = doc(firestore, "users", cred.user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userDoc = userSnap.data();
          localStorage.setItem("user-info", JSON.stringify(userDoc));
        } else {
          const userDoc = {
            uid: cred.user.uid,
            email: cred.user.email,
            userName: cred.user.email.split("@").shift(),
            fullName: cred.user.displayName,
            bio: "",
            profilePicURL: cred.user.photoURL,
          };
          await setDoc(doc(firestore, "users", cred.user.uid), userDoc);
          localStorage.setItem("user-info", JSON.stringify(userDoc));
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  return (
    <>
      <Button variant="light" onClick={handleSubmit}>
        Continue with Google
      </Button>
    </>
  );
};
export default GoogleAuth;
