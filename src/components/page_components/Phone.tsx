import { CiCamera, CiImageOn, CiLocationArrow1 } from "react-icons/ci";
import { IoMdContact } from "react-icons/io";

/**
 * ChatOlympics component creatively presents information about the Les Phryges and the Olympic Games.
 * Instead of a traditional chat interface, it uses a playful design to engage users.
 **/
const Phone = () => {
  const time = new Date();

  return (
    <div className="shadow-xl bg-white rounded-xl md:w-1/3 w-[95%] h-fit border-2 border-gray-300">
      <div className="text-center w-full p-3 shadow-md">
        <h3 className="text-2xl font-bold">Les Phryges</h3>
        <IoMdContact size={30} className="mx-auto" aria-label="contact-icon" />
      </div>
      <div className="text-white p-4 space-y-10 flex flex-col mx-auto text-xs md:text-lg overflow-scroll h-3/4">
        <div className="p-2 pb-0 bg-blue-400 rounded-md drop-shadow-lg right-0 self-end">
          <p>Que sont les jeux olympiques ?</p>
          <p className="text-sm opacity-65 float-end">{`${time.getHours()}:${time.getMinutes()}`}</p>
        </div>
        <div className="p-2 pb-0 bg-blue-600 rounded-md drop-shadow-lg">
          <p>
            Les Jeux Olympiques sont bien plus qu'un simple événement sportif.
            Ils sont une célébration de l'excellence, de l'unité et du
            dépassement de soi. En 2024, Paris accueillera ce rendez-vous
            mondial emblématique, offrant une plateforme unique où les athlètes
            du monde entier se réuniront pour rivaliser dans un esprit de
            fair-play et de camaraderie.
          </p>
          <p className="text-md opacity-65 float-end">{`${time.getHours()}:${
            time.getMinutes() + 1
          }`}</p>
        </div>
        <div className="p-2 pb-0 bg-blue-600 rounded-md drop-shadow-lg">
          <p>
            Plongez dans l'univers captivant des Jeux Olympiques France 2024 en
            explorant nos différentes sections. Découvrez le programme des
            compétitions, les sites emblématiques, et suivez les dernières
            actualités pour rester informé de tout ce qui se passe avant et
            pendant les Jeux.
          </p>
          <p className="text-md opacity-65 float-end">{`${time.getHours()}:${
            time.getMinutes() + 2
          }`}</p>
        </div>
        <div className="p-2 pb-0 bg-blue-400 rounded-md drop-shadow-lg self-end">
          <p>Pour qui sont fait les jeux olympiques ?</p>
          <p className="text-sm opacity-65 float-end">{`${time.getHours()}:${
            time.getMinutes() + 2
          }`}</p>
        </div>
        <div className="p-2 pb-0 bg-blue-600 rounded-md drop-shadow-lg">
          <p>
            Que vous soyez un passionné de sport, un amateur de culture ou
            simplement curieux de vivre cette expérience historique, les Jeux
            Olympiques France 2024 promettent d'être un moment inoubliable pour
            tous. Rejoignez-nous dans cette aventure unique et préparez-vous à
            vivre des émotions intenses au cœur de la compétition olympique.
          </p>
          <p className="text-md opacity-65 float-end">{`${time.getHours()}:${
            time.getMinutes() + 3
          }`}</p>
        </div>
      </div>
      <div className="h-fit flex items-center text-gray-600 space-x-5 border-t-2 p-3">
        <CiImageOn size={35} aria-label="image-icon" />
        <CiCamera size={35} aria-label="camera-icon" />
        <input
          type="text"
          name="message"
          id=""
          className="m-2 p-1.5 bg-gray-200 w-3/4 rounded-xl"
          aria-label="message"
        />
        <CiLocationArrow1 size={35} aria-label="location-icon" />
      </div>
    </div>
  );
};
export default Phone;
