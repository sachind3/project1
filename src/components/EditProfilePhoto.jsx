import "cropperjs/dist/cropper.css";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useCallback, useRef, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { Cropper } from "react-cropper";
import toast from "react-hot-toast";
import { useAuth } from "../context/Auth";
import { firestore, storage } from "../firebase";
import { dataURLtoBlob } from "../helpers";
const EditProfilePhoto = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const { currentUser, setCurrentUser } = useAuth();
  const types = ["image/png", "image/jpeg"];
  const fileRef = useRef();
  const [src, setSrc] = useState();
  const [show, setShow] = useState(false);
  const cropperRef = useRef(null);
  const selectImg = (e) => {
    let file = e.target.files[0];
    if (file && types.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        setSrc(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select an image file (jpeg or jpg)");
    }
  };
  const cropImg = useCallback(async () => {
    setIsSubmit(true);
    const dataUrl = await cropperRef.current.cropper
      .getCroppedCanvas({ width: 100, height: 100 })
      .toDataURL("image/jpeg");
    const blob = dataURLtoBlob(dataUrl);
    const storageRef = ref(storage, `users/${currentUser.uid}.jpg`);
    const uploadTask = uploadBytesResumable(storageRef, blob);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        // Observe state changes, such as progress, pause, and resume
      },
      function (error) {
        toast.error(error.message);
        setIsSubmit(false);
      },
      function () {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          const docRef = doc(firestore, "users", currentUser.uid);
          await updateDoc(docRef, {
            profilePicURL: downloadURL,
          })
            .then(() => {
              setCurrentUser({
                ...currentUser,
                profilePicURL: downloadURL,
              });
              setShow(false);
              setSrc();
              toast.success("Profile image updated successfully");
            })
            .catch((error) => {
              toast.error(error.message);
              console.log(error);
            })
            .finally(() => {
              setIsSubmit(false);
            });
        });
      }
    );
  }, [currentUser, setCurrentUser]);
  const handleClose = () => {
    setShow(false);
    setSrc();
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <div className="rounded-circle overflow-hidden ratio ratio-1x1">
            {currentUser?.profilePicURL ? (
              <div
                className="rounded-circle h-100 w-100 bg-secondary d-flex justify-content-center align-items-center text-white small"
                style={{
                  backgroundImage: `url(${currentUser?.profilePicURL})`,
                  backgroundSize: "cover",
                }}
              ></div>
            ) : (
              <div className="rounded-circle h-100 w-100 bg-secondary d-flex justify-content-center align-items-center text-white small"></div>
            )}
          </div>
          <div className="text-center pt-2">
            <Button size="sm" onClick={handleShow}>
              Edit Photo
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <Button as="label" className="profilePhotoSelect mb-3">
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={selectImg}
                ref={fileRef}
              />
              Browse Photo
            </Button>
            {!src && (
              <div className="profilePhotoDefaultPreview bg-secondary text-white d-flex justify-content-center align-items-center">
                Preview
              </div>
            )}
            {src && (
              <Cropper
                ref={cropperRef}
                autoCropArea={1}
                src={src}
                style={{ height: 200, width: 200, margin: "0 auto" }}
                aspectRatio={1 / 1}
                type={"square"}
                crossOrigin={"true"}
                viewMode={3}
                cropBoxMovable={false}
                cropBoxResizable={false}
                dragMode={"move"}
              />
            )}
          </div>
        </Modal.Body>
        {src && (
          <Modal.Footer className="justify-content-center">
            <>
              <Button variant="primary" onClick={cropImg} disabled={isSubmit}>
                {isSubmit ? "Updating ..." : "Update"}
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => cropperRef.current.cropper.rotate(90)}
              >
                Rotate
              </Button>
            </>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};
export default EditProfilePhoto;
