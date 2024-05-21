import { FaArrowDown } from "react-icons/fa";
import parisLogo2024 from "../assets/logos/Logo-olympics.png";

/**
 * Functional component representing the home presentation section of the website.
 *
 * @returns {JSX.Element} The JSX elements for the home presentation section.
 */
const HomePresentation = () => {
  return (
    <>
      <div className="w-screen h-screen">
        <div className="w-screen h-[95%] -z-10 absolute bg-home-presentation bg-no-repeat bg-cover staturate-50">
          <div className="relative p-4 backdrop-blur-[2px] w-screen h-full">
            <img
              src={parisLogo2024}
              alt="logo-paris-2024"
              className="absolute left-1/2 -translate-x-1/2 w-24"
            />
            <div className="top-[50%] relative">
              <h1 className="text-white text-5xl font-bold drop-shadow-lg p-2">
                Jeux Olympiques de Paris 2024
              </h1>
              <p className="text-white md:w-2/3 drop-shadow-xl p-2 w-11/12 md:text-xl">
                Bienvenue sur le site officiel des Jeux Olympiques de 2024 à
                Paris ! Explorez les compétitions, préparez votre séjour et
                restez informé des dernières actualités. Rejoignez-nous pour
                célébrer l'excellence sportive et l'esprit olympique à Paris en
                2024 !
              </p>
            </div>
          </div>
          <FaArrowDown
            size={45}
            className="drop-shadow-lg absolute left-1/2 translate-y-1/2 -translate-x-1/2 bottom-0 p-2 rounded-full bg-or-color text-bg-color"
          />
        </div>
      </div>
    </>
  );
};

export default HomePresentation;
