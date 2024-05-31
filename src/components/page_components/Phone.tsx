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
          <p>What are the Olympic Games?</p>
          <p className="text-sm opacity-65 float-end">{`${time.getHours()}:${time.getMinutes()}`}</p>
        </div>
        <div className="p-2 pb-0 bg-blue-600 rounded-md drop-shadow-lg">
          <p>
            The Olympic Games are much more than just a sporting event. They are
            a celebration of excellence, unity, and self-improvement. In 2024,
            Paris will host this iconic global event, providing a unique
            platform where athletes from around the world will come together to
            compete in a spirit of fair play and camaraderie.
          </p>
          <p className="text-md opacity-65 float-end">{`${time.getHours()}:${
            time.getMinutes() + 1
          }`}</p>
        </div>
        <div className="p-2 pb-0 bg-blue-600 rounded-md drop-shadow-lg">
          <p>
            Dive into the captivating world of the 2024 Olympic Games in France
            by exploring our different sections. Discover the competition
            schedule, iconic venues, and follow the latest news to stay informed
            about everything happening before and during the Games.
          </p>
          <p className="text-md opacity-65 float-end">{`${time.getHours()}:${
            time.getMinutes() + 2
          }`}</p>
        </div>
        <div className="p-2 pb-0 bg-blue-400 rounded-md drop-shadow-lg self-end">
          <p>Who are the Olympic Games for?</p>
          <p className="text-sm opacity-65 float-end">{`${time.getHours()}:${
            time.getMinutes() + 2
          }`}</p>
        </div>
        <div className="p-2 pb-0 bg-blue-600 rounded-md drop-shadow-lg">
          <p>
            Whether you're a sports enthusiast, a culture lover, or simply
            curious to experience this historic event, the 2024 Olympic Games in
            France promise to be an unforgettable moment for all. Join us on
            this unique adventure and get ready to experience intense emotions
            at the heart of the Olympic competition.
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
