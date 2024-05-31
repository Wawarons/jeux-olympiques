import Authentication from "../Authentication";
import Logout from "../components/authentication/logout/Logout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../Home";
import Page404 from "../Page404";
import ProtectedRoutes from "./ProtectedRoutes";
import NoAuthRoutes from "./NoAuthRoutes";
import NewPasswordForm from "../components/authentication/NewPasswordForm";
import Cart from "../Cart";
import Tickets from "../components/Bundles";
import AdminRoutes from "./AdminRoutes";
import Dashboard from "../Dashboard";

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
    {
      path: "/tickets",
      element: <Tickets />,
    },
  ];

  const authenticatedRoutes = [
    {
      path: "/",
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/cart",
          element: <Cart />,
        },
      ],
    },
  ];

  const adminRoutes = [
    {
    path: "/",
    element: <AdminRoutes />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />
      }
    ]}
  ]

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
          element: <Authentication type="forget_password" />,
        },
        {
          path: "/register/reset-password",
          element: <NewPasswordForm />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...publicRoutes,
    ...notAuthenticatedRoutes,
    ...authenticatedRoutes,
    ...adminRoutes
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
