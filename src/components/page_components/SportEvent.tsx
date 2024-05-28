import { SlArrowRight } from "react-icons/sl";

/**
 * Renders a list of sport events with their corresponding icons.
 *
 * @param events - An array of strings representing the names of the sport events.
 * @returns JSX element displaying the list of sport events with icons.
 */
const SportEvent = ({ events }: { events: string[] }) => {
  return (
    <ul className="w-4/5 rounded-lg border-2 border-gray-200 mx-auto mb-20">
      {events.map((epreuve: string, index: number) => {
        return (
          <li
            key={`${epreuve}_${index}`}
            className="hover:text-blue-400 hover:cursor-pointer flex justify-between items-center p-2 border-b-2 border-gray-200 md:p-4"
          >
            <p>{epreuve}</p>
            <SlArrowRight />
          </li>
        );
      })}
    </ul>
  );
};

export default SportEvent;
