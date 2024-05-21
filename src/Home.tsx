import HomePresentation from "./components/HomePresentation";
import NavBar from "./components/NavBar";
import Description from "./components/page_components/Phone";
import Article from "./components/page_components/Article";
import Footer from "./components/page_components/Footer";
import SportEvent from "./components/page_components/SportEvent";

/**
 * Function component representing the Home page of the application.
 * Renders the NavBar, HomePresentation, Description, Articles, Sport Events, and Footer components.
 *
 * @returns {JSX.Element} JSX element representing the Home page.
 */
const Home = () => {
  const epreuves_jo_2024 = [
    "Athlétisme",
    "Aviron",
    "Badminton",
    "Basket-ball",
    "Basket-ball à 3",
    "Beach-volley",
    "BMX freestyle",
    "BMX racing",
    "Boxe",
    "Breakdance",
    "Canoë-kayak slalom",
    "Canoë-kayak sprint",
    "Cyclisme sur route",
    "Cyclisme sur piste",
    "Escalade sportive",
    "Escrime",
    "Football",
    "Golf",
    "Gymnastique artistique",
    "Gymnastique rythmique",
    "Haltérophilie",
    "Handball",
    "Hockey sur gazon",
    "Judo",
    "Karaté",
    "Lutte gréco-romaine",
    "Lutte libre",
    "Natation",
    "Natation artistique",
    "Pentathlon moderne",
    "Plongeon",
    "Rugby à 7",
    "Skateboard",
    "Softball",
    "Surf",
    "Taekwondo",
    "Tennis",
    "Tennis de table",
    "Tir",
    "Tir à l'arc",
    "Triathlon",
    "VTT",
    "Voile",
    "Volley-ball",
    "Water-polo",
  ];

  return (
    <>
      <NavBar />
      <HomePresentation />
      <div className="flex flex-col md:flex-row w-[95%] mx-auto p-4 space-x-10 h-1/6 ">
        <Description />

        <div className="flex flex-col w-3/4">
          <h2 className="text-6xl font-bold my-10 w-fit max-sm:mx-auto">
            Articles
          </h2>

          <div className="flex flex-wrap space-y-5 items-center justify-stretch h-[30%]">
            <Article />
            <Article />
            <Article />
            <Article />
            <Article />
            <Article />
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-6xl font-bold p-2 my-20 w-full text-center border-t-2">
          Epreuves
        </h2>
        <SportEvent events={epreuves_jo_2024} />
      </div>
      <Footer />
    </>
  );
};

export default Home;