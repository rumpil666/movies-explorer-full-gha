import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn }) => {
  return loggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
