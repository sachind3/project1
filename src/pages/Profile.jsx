import { Col, Container, Row } from "react-bootstrap";
import EditProfile from "../components/EditProfile";
import EditProfilePhoto from "../components/EditProfilePhoto";

const Profile = () => {
  return (
    <>
      <section className="py-4">
        <Container>
          <h4>Profile</h4>
          <Row>
            <Col md={3}>
              <EditProfilePhoto />
            </Col>
            <Col md={9}>
              <EditProfile />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default Profile;
