import mascotteSolo from "./assets/mascottes/Mascotte_solo.png";
import NavBar from "./components/NavBar";

/**
 * Functional component representing the 404 page.
 *
 * This component displays a message indicating that the page was not found,
 * along with a cute mascot image and a link back to the home page.
 *
 * @returns {JSX.Element} The JSX element representing the 404 page.
 */
const Page404 = () => {
  return (
    <>
      <NavBar />
      <div className="w-3/4 absolute top-1/2 left-1/2 -translate-x-1/2 text-center space-y-10">
        <h1 className="text-6xl font-bold">404 page not found</h1>
        <p className="text-xl">
          🏅 Oops! It seems like you’ve missed the gold medal in navigation. 🏅
        </p>
      </div>
      <a href="/" title="Home page">
        <img className="w-1/3 mx-auto" src={mascotteSolo} alt="mascotte JO" />
      </a>
    </>
  );
};

export default Page404;
