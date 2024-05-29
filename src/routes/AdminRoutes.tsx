import { Outlet } from "react-router";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDataToken } from "../utils/authService";

/**
 * Function component that handles the routing for the admin section of the application.
 * It checks for the presence of a valid token and user authentication before rendering the admin routes.
 * If the user is not authenticated or does not have the required role, it redirects to the home page.
 *
 * @returns {JSX.Element} The component that renders the admin routes or redirects based on authentication.
 */
const AdminRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAuth = localStorage.getItem("auth");

    if (token && isAuth === "isAuth") {
      try {
        const { sub, roles } = getDataToken(token);
        if (sub && roles.length) {
          if (!roles.includes("ADMIN")) navigate("/");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("An error occured");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  return <Outlet />;
};

export default AdminRoutes;
