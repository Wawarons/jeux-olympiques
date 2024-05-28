import { FaArrowDown } from "react-icons/fa";

export type PresentationProps = {
  title: string,
  description: string,
  imgSrc: string 
} 

/**
 * Functional component representing the home presentation section of the website.
 *
 * @returns {JSX.Element} The JSX elements for the home presentation section.
 */
const Presentation = ({title, description, imgSrc}: PresentationProps) => {
  return (
    <>
      <div className="w-screen h-screen">
        <div  style={{backgroundImage: `url(${imgSrc})`}} className={`w-screen h-[95%] -z-10 absolute bg-no-repeat bg-cover staturate-50`}>;
          <div className="relative w-screen h-full">
            <div className="top-1/4 p-4 relative backdrop-blur-[5px] border-white border-y-4 ">
              <h1 className=" text-white text-5xl lg:text-6xl font-bold drop-shadow-lg p-2">
                {title}
              </h1>
              <p className="text-white drop-shadow-xl p-2 md:text-xl">
                {description}
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

export default Presentation;
