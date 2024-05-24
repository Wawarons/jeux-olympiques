import SideMenu from "./SideMenu";
import OlympicRingsLogo from "../assets/logos/Olympic_Rings_black.svg";
import { useState } from "react";
import { IoCloseSharp, IoMenu } from "react-icons/io5";

/**
 * Renders the navigation bar component.
 *
 * This component displays a navigation bar with a logo and a side menu.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
const NavBar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <div
      className={`top-0 px-2 flex flex-col w-screen items-center ${
        showMenu ? "fixed z-10" : "relative"
      }`}
    >
      <nav className="w-screen flex p-3 justify-between bg-white shadow-md">
        <a href="/">
          <img src={OlympicRingsLogo} alt="" className="w-[60px]" />
        </a>
        {showMenu ? (
          <IoCloseSharp
            onClick={() => {
              setShowMenu(false);
            }}
            className="hover:drop-shadow-2xl cursor-pointer hover:scale-110 transform transition duration-300 "
            size={35}
          />
        ) : (
          <IoMenu
            onClick={() => {
              setShowMenu(true);
            }}
            size={35}
            className="cursor-pointer hover:scale-110 transform transition duration-300"
          />
        )}
      </nav>
      <div>{showMenu && <SideMenu />}</div>
    </div>
  );
};

export default NavBar;
