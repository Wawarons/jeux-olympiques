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
    <div className="space-y-6 bg-blue-500 text-white">
      <div className="flex justify-evenly">
        <div className="text-center">
          <p className="text-lg font-bold my-2">Contact</p>
          <ul className="">
            <li className="text-sm">Email: <a href="mailto:contact@jo2024.com">contact@jo2024.com</a></li>
            <li className="text-sm">Télélihone: 03.21.19.15.12</li>
            <li className="text-sm">
              Adresse: 25 Rue Argenteuil, Paris 73000, France
            </li>
          </ul>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold my-2">Socials</p>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com">
              <FaInstagram size={sizeIcon} />
            </a>
            <a href="https://www.instagram.com">
              <FaFacebook size={sizeIcon} />
            </a>
            <a href="https://www.x.com">
              <FaTwitter size={sizeIcon} />
            </a>
            <a href="https://www.tiktok.com">
              <FaTiktok size={sizeIcon} />
            </a>
            <a href="https://www.youtube.com">
              <FaYoutube size={sizeIcon} />
            </a>
          </div>
        </div>
      </div>
      <div className="text-md flex justify-between w-full px-2">
        <p className="text-sm">FAQ</p>
        <p className="text-sm">Mentions Légales</p>
        <p className="text-sm">Politique de confidentialité</p>
        <p className="text-sm">Conditions générales</p>
        <p className="text-sm">
          © Jeux Olympiques Paris {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Footer;
