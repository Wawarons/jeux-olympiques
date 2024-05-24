import Authentication from "../Authentication";
import Logout from "../components/authentication/logout/Logout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../Home";
import Page404 from "../Page404";
import ProtectedRoutes from "./ProtectedRoutes";
import NoAuthRoutes from "./NoAuthRoutes";
import NewPasswordForm from "../components/authentication/NewPasswordForm";

/**
 * Function that defines the routing configuration for the application.
 * It specifies the public routes, authenticated routes, and not authenticated routes.
 * Uses the createBrowserRouter function from react-router-dom to create the router.
 *
 * @returns {JSX.Element} The RouterProvider component with the configured router.
 */
const Routes = () => {
  const publicRoutes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "*",
      element: <Page404 />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
  ];

  const authenticatedRoutes = [
    {
      path: "/",
      element: <ProtectedRoutes />,
      children: [],
    },
  ];

  const notAuthenticatedRoutes = [
    {
      path: "/",
      element: <NoAuthRoutes />,
      children: [
        {
          path: "/register",
          element: <Authentication type="login" />,
        },
        {
          path: "/forget_password",
          element: <Authentication type="forget_password"/>,
        },
        {
          path: "/register/reset-password",
          element: <NewPasswordForm/>
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...publicRoutes,
    ...notAuthenticatedRoutes,
    ...authenticatedRoutes,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
