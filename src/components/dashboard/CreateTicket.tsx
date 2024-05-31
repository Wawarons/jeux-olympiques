import { FormEvent, useRef, useState } from "react";
import { Ticket, createTicket } from "../../utils/apiService";
import Message, { MessageType } from "../authentication/Message";

type CreateTicketProps = {
  reload: (state: boolean) => void;
};
/**
 * Function component for creating a new ticket.
 *
 * This component allows the user to input details for a new ticket, such as title, description, price, quantity, start date, and end date.
 * The user can also mark the ticket as available or not. Upon form submission, the function calls the createTicket API to create the ticket.
 * If successful, a success message is displayed, the form is reset, and the parent component is reloaded.
 * If there is an error, an error message is displayed.
 *
 * @param {Object} CreateTicketProps - Props for the CreateTicket component.
 * @param {Function} CreateTicketProps.reload - Function to reload the parent component.
 *
 * @returns {JSX.Element} A form for creating a new ticket with input fields and buttons.
 */
const CreateTicket = ({ reload }: CreateTicketProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageType | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleNewTicket = async (event: FormEvent) => {
    event.preventDefault();
    const { title, description, price, quantity, start_date, end_date } =
      event.target as typeof event.target & {
        title: { value: string };
        description: { value: string };
        price: { value: string };
        quantity: { value: string };
        start_date: { value: string };
        end_date: { value: string };
      };
      
    const ticket: Ticket = {
      title: title.value,
      description: description.value,
      price: parseFloat(price.value),
      quantity: parseInt(quantity.value),
      isAvailable: isChecked,
      startDate: start_date.value,
      endDate: end_date.value,
    };

    const response = await createTicket(ticket);
    if (response) {
      setMessage({
        message: "Ticket created successfully !",
        type: "positive",
      });
      handleReset();
      reload(true);
    } else setMessage({ message: "An error occured", type: "negative" });

    setTimeout(() => {
      setMessage(null);
    }, 2500);
  };

  const handleReset = () => {
    if (formRef.current) formRef.current.reset();
  };

  return (
    <div className="form-shadow flex flex-col p-4 space-y-2 md:w-1/2 w-11/12 mt-20 mb-10 mx-auto rounded-md">
      <h2 className="w-fit mx-auto my-2 text-3xl text-blue-500 font-bold">
        New ticket
      </h2>
      <Message messages={message?.message} type={message?.type} />
      <form
        method="POST"
        className="flex flex-col p-4 space-y-2"
        ref={formRef}
        onSubmit={handleNewTicket}
      >
        <label htmlFor="title">
          Title <span className="text-xs opacity-45">3-25 characters</span>
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="form_input"
          min={3}
          max={25}
          required
        />
        <label htmlFor="description">
          Description{" "}
          <span className="text-xs opacity-45">10-225 characters</span>
        </label>
        <textarea
          name="description"
          id="description"
          className="form_input"
          minLength={10}
          maxLength={250}
          required
        ></textarea>
        <label htmlFor="price">Price</label>
        <input
          type="text"
          name="price"
          id="price"
          pattern="^[1-9]\d*(\.\d{1,5})?$"
          className="form_input"
          required
        />
        <label htmlFor="price">Quantity</label>
        <input
          type="text"
          name="quantity"
          id="quantity"
          pattern="\d+"
          className="form_input"
          required
        />
        <label htmlFor="start_date">Start</label>
        <input
          type="date"
          name="start_date"
          id="start_date"
          min={new Date().toISOString().split("T")[0]}
          className="form_input"
          required
        />
        <label htmlFor="end_date">End</label>
        <input
          type="date"
          name="end_date"
          id="end_date"
          min={new Date().toISOString().split("T")[0]}
          className="form_input"
          required
        />
        <div className="space-x-2">
          <label htmlFor="is_available">Available</label>
          <input
            type="checkbox"
            name="is_available"
            id="is_available"
            checked={isChecked}
            onChange={() => {}}
            onClick={() => setIsChecked(!isChecked)}
          />
        </div>
        <div className="flex space-x-10 w-fit pt-3">
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            Create
          </button>
          <button
            onClick={handleReset}
            className="p-1 px-2 rounded-md border-2 border-blue-500 text-blue-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;
