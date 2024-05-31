interface EventDetail {
  label: string;
  value: string;
}

interface OlympicEventProps {
  eventName: string;
  eventDescription: string;
  eventDetails: EventDetail[];
}

const OlympicEvent= ({ eventName, eventDescription, eventDetails }: OlympicEventProps) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg my-10">
      <h1 className="text-4xl font-bold text-center text-blue-500 mb-6">
        {eventName}
      </h1>
      <div className="flex flex-col items-center mb-8">
        <p className="text-lg text-justify text-gray-700 leading-relaxed">
          {eventDescription}
        </p>
      </div>
      <div className="mt-8">
        <h2 className="text-3xl font-semibold text-center text-blue-500 mb-4">
          Event Details
        </h2>
        <ul className="list-none text-lg text-gray-700 space-y-2">
          {eventDetails.map((detail, index) => (
            <li key={index}><strong>{detail.label}:</strong> {detail.value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OlympicEvent;
