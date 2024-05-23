import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { IoCloseSharp, IoMenu } from "react-icons/io5";
import LinksList, { linksListType } from "./utils/LinksList";

/**
 * Renders a side menu component with customizable icon color.
 *
 * @param {string} iconColor - The color of the menu icon. Defaults to "white".
 *
 * @returns {JSX.Element} A side menu component with links, user authentication options, and settings.
 */
const SideMenu = ({ iconColor }: { iconColor?: string }) => {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [hidden, setHidden] = useState("hidden");
  const links: linksListType[] = [
    {
      title: "Buy tickets",
      href: "#"
    },
    {
      title: "Events",
      href: "#",
    },
    {
      title: "Cart",
      href: "#",
    },
  ];

  return (
    <div className="m-2 mx-4 flex items-centerh-fit">
      <IoMenu
        color={iconColor ? iconColor : "white"}
        onClick={() => {
          setVisible(true);
          setHidden("");
        }}
        size={35}
        className="cursor-pointer"
      />
      <div
        className={`${
          visible ? "slide-show-menu" : "slide-hidden-menu"
        } ${hidden} drop-shadow-2xl md:rounded-md md:w-1/3 lg:w-1/4 xl:w-1/5 md:absolute z-10 fixed right-0 top-0 w-screen md:h-[70vh] h-full bg-bg-color text-text-color flex flex-col align-middle items-center`}
      >
        <div className="relative top-0 w-full h-fit border-b-2 border-or-color">
          <img
            src="https://i.ibb.co/xqfV6YN/paris-rings-jo.jpg"
            alt="paris-rings-jo"
            className=""
          />
          <IoCloseSharp
            onClick={() => {
              setVisible(false);
              setTimeout(() => {
                setHidden("hidden");
              }, 500);
            }}
            className="absolute top-2 left-2 font-bold text-or-color cursor-pointer"
            size={35}
          />
        </div>
        <LinksList linksList={links} classLink="p-4 w-fit mx-auto hover:text-blue-400 text-xl text-center"/>
        <div className="flex absolute bottom-5 justify-between w-5/6 left-1/2 transform -translate-x-1/2">
          {user.isAuth ? (
            <a
              href="#"
              className="flex items-center justify-between p-2 bg-or-color rounded-md button-shadow w-fit font-bold"
              onClick={() => setConfirmLogout(!confirmLogout)}
            >
              Logout
            </a>
          ) : (
            <a
              href="/register"
              className="flex items-center justify-between p-2 bg-or-color rounded-md button-shadow w-fit font-bold"
            >
              Login
            </a>
          )}
          <a className="flex items-center justify-between p-2 bg-or-color rounded-md button-shadow w-fit font-bold">
            Settings
          </a>
          {confirmLogout && (
            <div className="border-2 border-blue-500 flex flex-col justify-between rounded-md p-4 bg-white w-fulll space-y-4">
              <p className="text-lg w-fit mx-auto">
                Confirmer la deconnexion ?
              </p>
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
      </div>
    </div>
  );
};

export default SideMenu;
