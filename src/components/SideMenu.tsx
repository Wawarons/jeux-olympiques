import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import LinksList, { linksListType } from "./utils/LinksList";

/**
 * Renders a side menu component with customizable icon color.
 *
 * @param {string} iconColor - The color of the menu icon. Defaults to "white".
 *
 * @returns {JSX.Element} A side menu component with links, user authentication options, and settings.
 */
const SideMenu = () => {
  const { user } = useAuth();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const links: linksListType[] = [
    {
      title: "Home",
      href: "#",
    },
    {
      title: "Buy tickets",
      href: "/tickets",
    },
    {
      title: "Events",
      href: "#",
    },
    {
      title: "Cart",
      href: "/cart",
    },
  ];

  return (
    <div className="drop-shadow-2xl md:rounded-md md:w-1/3 lg:w-1/4 xl:w-1/5 fixed right-0 w-screen z-10 md:h-[70vh] h-full bg-bg-color text-text-color flex flex-col align-middle items-center">
      <img
        src="https://i.ibb.co/xqfV6YN/paris-rings-jo.jpg"
        alt="paris-rings-jo"
        className="relative top-0 w-full h-fit border-b-2 border-or-color"
      />
      <LinksList
        linksList={links}
        classLink="p-4 mx-auto hover:text-blue-400 text-xl text-center side-menu-link w-full"
      />

      {user.isAuth ? (
        <>
          <a href="#" className="p-4 mx-auto hover:text-blue-400 text-xl text-center side-menu-link w-full">
            Settings
          </a>
          <a
            href="#"
            onClick={() => setConfirmLogout(!confirmLogout)}
            className="p-4 mx-auto hover:text-blue-400 text-xl text-center side-menu-link w-full"
          >
            Logout
          </a>
        </>
      ) : (
        <a
          href="/register"
          className="p-4 mx-auto hover:text-blue-400 text-xl text-center side-menu-link w-full"
        >
          Login
        </a>
      )}
      {confirmLogout && (
        <div className="border-2 border-blue-500 flex flex-col justify-between rounded-md p-4 bg-white w-fulll space-y-4">
          <p className="text-lg w-fit mx-auto">Confirmer la deconnexion ?</p>
          <div className="flex justify-around  text-white rounded-md cursor-pointer ">
            <a
              className="p-2 bg-blue-400 rounded-md shadow-md hover:shadow-none"
              href="/logout"
            >
              Confirm
            </a>
            <a
              className="p-2 bg-blue-400 rounded-md shadow-md hover:shadow-none"
              onClick={() => setConfirmLogout(false)}
            >
              Cancel
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideMenu;
