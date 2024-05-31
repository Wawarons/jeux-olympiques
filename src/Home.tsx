import NavBar from "./components/NavBar";
import Description from "./components/page_components/Phone";
import Footer from "./components/page_components/Footer";
import parisLogo2024 from "./assets/pics/home_presentation.png";
import Presentation from "./components/Presentation";
import Events from "./Events";

/**
 * Function component representing the Home page of the application.
 * Renders the NavBar, HomePresentation, Description, Articles, Sport Events, and Footer components.
 *
 * @returns {JSX.Element} JSX element representing the Home page.
 */
const Home = () => {

  return (
    <>
      <NavBar />
      <Presentation imgSrc={parisLogo2024} title={"Paris 2024 Olympic Games"} description={"Welcome to the official website of the 2024 Olympic Games in Paris! Explore the competitions, plan your stay, and stay informed about the latest news. Join us to celebrate sporting excellence and the Olympic spirit in Paris in 2024!"} />
      <div className="flex flex-col md:flex-row w-[95%] mx-auto p-4 space-x-10 h-1/6 ">
        <Description />

        <div className="flex flex-col w-3/4 items-center">
          <h2 className="section-title max-sm:mx-auto">
            Events
          </h2>

          <div className="flex flex-wrap space-y-5 items-center justify-stretch h-[30%]">
             <Events/>
          </div>
        </div>
      </div>
      <div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
