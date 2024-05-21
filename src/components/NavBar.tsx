import SideMenu from "./SideMenu";
import OlympicRingsLogo from "../assets/logos/Olympic_Rings_black.svg";

/**
 * Renders the navigation bar component.
 *
 * This component displays a navigation bar with a logo and a side menu.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
const NavBar = () => {
  return (
    <nav className="relative top-0 px-2 flex justify-between w-full items-center bg-white shadow-md">
      <a href="/">
        <img src={OlympicRingsLogo} alt="" className="w-[60px]"/>
      </a>
      <div>
        <a href=""></a><a href=""></a><a href=""></a>
      </div>
      <SideMenu iconColor="black"/>
    </nav>
  );
};

export default NavBar;
