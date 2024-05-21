import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/**
 * Function component for handling user logout functionality.
 * Removes the token from local storage and sends a logout request to the server.
 * Navigates the user back to the home page after successful logout.
 */
const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");

    /**
     * Sends a request to remove the cookie related to the user's authentication and navigates the user to the home page.
     */
    const logout = () => {
      axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        withCredentials: true,
      });

      navigate("/", { replace: true });
    };

    logout();
  });

  return <div></div>;
};

export default Logout;
