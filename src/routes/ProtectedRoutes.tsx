import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getDataToken } from "../utils/authService";

/**
 * Function component that handles rendering protected routes based on user authentication status.
 * It uses the useAuth hook to access the user object from the AuthProvider.
 * If the user is not authenticated, it redirects to the "/register" route using the Navigate component.
 * If the user is authenticated, it renders the child routes using the Outlet component.
 */
const ProtectedRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAuth = localStorage.getItem("auth");

    if (token && isAuth === "isAuth") {
      try {
        const {sub, roles} = getDataToken(token);
        if (sub && roles.length) {
         
          if (!roles.includes("USER")) navigate("/register");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("An error occured");
      }
    } else {
      navigate("/register");
    }
  }, [navigate]);

  return <Outlet />;
};

export default ProtectedRoutes;
