import { Navigate, useLocation } from "react-router-dom";
import swal from "sweetalert";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  return localStorage.getItem("token")
    ? children
    : swal("Error", "Please login first", "warning") && (
        <Navigate to="/" replace state={{ path: location.pathname }} />
      );
};

export default RequireAuth;
