import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, isLoggedIn, isLoading }) => {
  const location = useLocation();

  if (isLoading) {
    return null; 
  }

  if (!isLoggedIn) {

    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;