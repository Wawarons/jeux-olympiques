import OlympicEvent from "./components/page_components/OlympicEvent";

/**
 * Renders the Events component, displaying information about two Olympic events: 200m Freestyle Swimming and Men's Basketball Tournament.
 *
 * @returns {JSX.Element} The rendered JSX elements for the Events component.
 */
const Events = () => {
  const swimmingEvent = {
    eventName: "200m Freestyle Swimming",
    eventDescription:
      "The 200 meters freestyle swimming event is a test of speed, endurance, and technique in the water. Swimmers compete to complete four lengths of the pool in the fastest time possible, employing various stroke techniques and strategies to gain an advantage over their competitors.",
    eventDetails: [
      { label: "Distance", value: "200 meters" },
      { label: "World Record", value: "1:42.96 minutes (Paul Biedermann)" },
      { label: "First Olympic Appearance", value: "1900 (Men), 1968 (Women)" },
      {
        label: "Reigning Olympic Champion",
        value: "Sun Yang (Men), Katie Ledecky (Women)",
      },
    ],
  };

  const basketballEvent = {
    eventName: "Men's Basketball Tournament",
    eventDescription:
      "The men's basketball tournament at the Olympics features top national teams from around the world competing for the gold medal. It is a showcase of skill, athleticism, and teamwork, with intense matches that captivate audiences globally.",
    eventDetails: [
      { label: "Number of Teams", value: "12" },
      { label: "Number of Players per Team", value: "12" },
      { label: "First Olympic Appearance", value: "1936" },
      { label: "Reigning Olympic Champion", value: "United States" },
    ],
  };

  const cyclingEvent = {
    eventName: "Men's Road Race",
    eventDescription: "The men's road race is a cycling event that takes place on a course with varying terrain and distances. Riders compete to complete the race in the fastest time, navigating hills, descents, and flat stretches. It is a test of endurance, strategy, and teamwork.",
    eventDetails: [
      { label: "Distance", value: "Approximately 250 kilometers" },
      { label: "First Olympic Appearance", value: "1896" },
      { label: "Reigning Olympic Champion", value: "Richard Carapaz" }
    ]
  };
  

  return (
    <div>
      <OlympicEvent {...swimmingEvent} />
      <OlympicEvent {...basketballEvent} />
      <OlympicEvent {...cyclingEvent} />
    </div>
  );
};

export default Events;
