import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/Auth";

const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  let location = useLocation();
  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to={"/auth"} state={{ from: location }} />
  );
};
export default ProtectedRoute;
