import { Navigate } from "react-router-dom";
import AuthContext from "./Context/AuthContext";
import { useContext } from "react";
import NotAuthorized from "./pages/NotAuthorised/NotAuthorised";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;

  if (user.role !== role) return <NotAuthorized />;

  if (user) return children;
};

export default ProtectedRoute;
