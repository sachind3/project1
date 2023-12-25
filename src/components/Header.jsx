import { signOut } from "firebase/auth";
import { forwardRef } from "react";
import { Container, Dropdown, Image, Nav, Navbar } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { auth } from "../firebase";

const Header = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const handleLogout = async () => {
    await signOut(auth)
      .then(() => {
        localStorage.removeItem("user-info");
        setCurrentUser(null);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <Navbar expand="sm" className="bg-body-tertiary shadow-sm" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          React Bootstrap
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ms-auto align-items-center">
            {currentUser ? (
              <>
                <Nav.Link as={Link} to="myposts">
                  My Posts
                </Nav.Link>
                <Nav.Link as={Link} to="createpost">
                  Create Post
                </Nav.Link>
                <Dropdown align={"end"}>
                  <Dropdown.Toggle id="dropdown-basic" as={CustomToggle}>
                    {currentUser?.userName}{" "}
                    <Image
                      src={currentUser?.profilePicURL}
                      width={25}
                      height={25}
                      className="rounded-circle"
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.ItemText>
                      {currentUser?.fullName}
                    </Dropdown.ItemText>
                    <Dropdown.Item as={Link} to="profile">
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item as="button" onClick={handleLogout}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="auth">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <div
    className="py-1 px-2"
    ref={ref}
    style={{ cursor: "pointer" }}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </div>
));
