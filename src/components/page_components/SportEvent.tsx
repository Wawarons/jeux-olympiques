import { useState } from "react";
import { SlArrowDown, SlArrowRight } from "react-icons/sl";
import { SportEventType } from "../../Home";

/**
 * Renders a list of sport events with their corresponding icons.
 *
 * @param events - An array of strings representing the names of the sport events.
 * @returns JSX element displaying the list of sport events with icons.
 */
const SportEvent = () => {
  const epreuves_jo_2024: SportEventType[] = [
    {
      title: "Athletics",
      description:
        "Athletics is one of the most iconic disciplines of the Olympic Games. It includes a variety of events such as sprinting, long jump, shot put, high jump, and more. Athletes compete to achieve outstanding performances in different disciplines.",
    },
    {
      title: "Swimming",
      description:
        "Swimming is another hugely popular discipline of the Olympic Games, featuring a range of events from freestyle and backstroke races to butterfly and breaststroke, as well as relays. Swimmers compete to break world records and win Olympic medals.",
    },
    {
      title: "Artistic Gymnastics",
      description:
        "Artistic gymnastics combines grace, agility, and strength. Gymnasts perform a series of complex movements on various apparatuses such as the beam, uneven bars, floor, and vault. Judges evaluate the technique, creativity, and difficulty of the routines.",
    },
    {
      title: "Tennis",
      description:
        "Introduced to the modern Olympic Games in 1896, tennis has become a staple event. Players compete in singles, doubles, and mixed doubles to win gold medals. Matches are often intense, showcasing the precision, power, and endurance of athletes.",
    },
  ];

  const [description, setDescription] = useState(false);
  return (
    <ul className="w-4/5 rounded-lg border-2 border-gray-200 mx-auto mb-20">
      {epreuves_jo_2024.map((epreuve, index) => {
        return (
          <li
            key={`${epreuve}_${index}`}
            className={`${
              description ? "flex-col" : ""
            } space-x-3 hover:text-blue-400 hover:cursor-pointer flex justify-between items-center p-2 border-b-2 border-gray-200 md:p-4`}
            onClick={() => setDescription(!description)}
          >
            <p className={`${description ? "flex-col text-xl mb-2  p-2" : ""}`}>
              {epreuve.title}
            </p>
            {description && <div>{epreuve.description}</div>}
            {!description ? <SlArrowRight /> : <SlArrowDown />}
          </li>
        );
      })}
    </ul>
  );
};

export default SportEvent;
