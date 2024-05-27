import { Navigate, Outlet } from "react-router-dom";

/**
 * Function component that handles rendering protected routes based on user authentication status.
 * It uses the useAuth hook to access the user object from the AuthProvider.
 * If the user is not authenticated, it redirects to the "/register" route using the Navigate component.
 * If the user is authenticated, it renders the child routes using the Outlet component.
 */
const ProtectedRoutes = () => {
  const isAuth = localStorage.getItem("auth");

  if (!(isAuth && isAuth === "isAuth")) return <Navigate to="/register" />;

  return <Outlet />;
};

export default ProtectedRoutes;
