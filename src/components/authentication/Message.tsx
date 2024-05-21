type Props = {
  messages?: string[] | string;
  type?: "positive" | "negative" | string;
};

export type MessageType = {
  message: string[] | string;
  type: "positive" | "negative" | string;
};

const Message = ({ messages, type }: Props) => {

  return (
    <>
      {Array.isArray(messages) && messages.length ? (
        <ul className={`p-2 rounded-md font-bold text-md space-y-2 ${type}`}>
          {messages.map((message, index) => {
            return (
              <li key={index} className="first-letter:uppercase">
                {message}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={`p-2 rounded-md font-bold text-md space-y-2 ${type}`}>{messages}</p>
      )}
    </>
  );
};

export default Message;
