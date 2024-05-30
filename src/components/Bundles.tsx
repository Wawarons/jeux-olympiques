import { useCallback, useEffect, useState } from "react";
import { BundleProps, getBundles } from "../utils/CartService";
import NavBar from "./NavBar";
import ticketBackground from "../assets/pics/paris2024-tickets.jpg";
import Presentation from "./Presentation";
import Footer from "./page_components/Footer";
import Bundle from "./page_components/Bundle";

/**
 * Renders a component that displays a list of bundles available for purchase.
 * Fetches bundle data from the server and renders each bundle as a 'Bundle' component.
 * 
 * @returns JSX.Element
 */
const Bundles = () => {
  const [formulasData, setBundlesData] = useState<BundleProps[]>();

  const getBundlesData = useCallback(() => {
    getBundles().then((bundles) => setBundlesData(bundles));
  }, []);

  useEffect(() => {
    getBundlesData();
  }, [getBundlesData]);

  return (
    <div className="flex flex-col justify-between">
      <NavBar />
      <Presentation
        title={"Bundles"}
        description={"Buy your tickets and come see an intenational event !"}
        imgSrc={ticketBackground}
      />
      <div className="w-5/6 mx-auto mb-10 md:h-screen">
        <h2 className="md:mx-auto section-title">Bundles</h2>
        <p className="mb-5 opacity-75">
          Don't forget to buy your tickets only from official channels to avoid
          any risk of fraud. Paris 2024 does not issue paper tickets, and the
          ticketing is entirely digital. Fully enjoy this unique experience!
        </p>
        <div className="space-y-4 lg:space-x-5 flex flex-col md:flex-row flex-wrap justify-around items-center">
          {formulasData?.map((formula, index) => {
            return (
              <Bundle
                key={index}
                title={formula.title}
                description={formula.description}
                id={formula.id}
                ticket={formula.ticket}
                discount={formula.discount}
                quantity={formula.quantity}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bundles;
