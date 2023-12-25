import { useEffect, useState } from "react";
import { Card, CardTitle, Container, Stack } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import GoogleAuth from "../components/auth/GoogleAuth";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import { useAuth } from "../context/Auth";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser) {
      navigate(from, { replace: true });
    }
  }, [currentUser, from, navigate]);

  return (
    <section className="py-4">
      <Container>
        <Stack className="col-lg-5 col-md-6 mx-auto">
          <Card>
            <Card.Body>
              <Stack gap={3}>
                <CardTitle>{isLogin ? "Log In" : "Sign Up"}</CardTitle>
                <GoogleAuth />
                <div className="d-flex justify-content-center align-items-center">
                  <div className="flex-grow-1">
                    <hr />
                  </div>
                  <div className="px-4">Or</div>
                  <div className="flex-grow-1">
                    <hr />
                  </div>
                </div>
                {isLogin ? <Login /> : <SignUp />}

                <div className="text-center small">
                  {isLogin ? "Don't have account?" : "Already have an account?"}{" "}
                  <span
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? "Sign Up" : "Log In"}
                  </span>
                </div>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      </Container>
    </section>
  );
};
export default Auth;
