import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

/**
 * Function component that handles routing for non-authenticated users.
 * It checks the authentication status of the user using the useAuth hook.
 * If the user is authenticated, it redirects to the home page.
 * If the user is not authenticated, it renders the child routes using the Outlet component.
 * @returns JSX.Element
 */
const NoAuthRoutes = () => {
  const { user } = useAuth();

  if (user.isAuth) return <Navigate to="/" />;
  return <Outlet />;
};

export default NoAuthRoutes;
