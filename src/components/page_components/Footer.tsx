import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

/**
 * Footer component to display footer information including social media links, contact information, and legal details.
 *
 * @returns {JSX.Element} Footer component with social media icons, contact details, and legal information.
 */
const Footer = () => {
  const sizeIcon = 20;

  return (
    <div className="p-4 mt-10 h-36 bg-slate-400 text-xs md:text-md flex flex-col justify-between">
      <div className=" flex justify-between space-x-2">
        <div className="w-fit flex flex-col space-y-2 h-fit justify-around">
          <p className="w-fit font-bold">Suivez nous sur nos réseaux:</p>
          <div className="flex space-x-4">
            <FaInstagram size={sizeIcon} />
            <FaFacebook size={sizeIcon} />
            <FaTwitter size={sizeIcon} />
            <FaTiktok size={sizeIcon} />
            <FaYoutube size={sizeIcon} />
          </div>
        </div>

        <div className="w-fit flex flex-col space-y-2 h-fit">
          <p className="w-fit font-bold">Contactez nous:</p>
          <div className="flex flex-col align-middle">
            <p>Email: contact@jo2024.com</p>
            <p>Téléphone: 03.21.19.15.12</p>
            <p>Adresse: 25 Rue Argenteuil, Paris 73000, France</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-md flex w-fit space-x-2">
          <p>FAQ</p>
          <p>Mentions Légales</p>
          <p>Politique de confidentialité</p>
          <p>Conditions générales</p>
        </div>
        <p>©Jeux Olympiques Paris {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default Footer;
