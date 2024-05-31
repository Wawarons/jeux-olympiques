import { FormEvent, useEffect, useRef, useState } from "react";
import Message, { MessageType } from "../authentication/Message";
import {
  Bundle,
  TicketResponse,
  createBundle,
  getTickets,
} from "../../utils/apiService";

export type BundleProps = {
  reload: (state: boolean) => void;
};

/**
 * Function component for creating a new bundle.
 * 
 * This component allows the user to create a new bundle by providing a title, description, discount, quantity, and selecting a ticket.
 * Upon successful creation of the bundle, a success message is displayed, and the form is reset.
 * If an error occurs during bundle creation, an error message is shown.
 * 
 * @param {BundleProps} reload - A function to reload the state after creating a new bundle.
 * 
 * @returns {JSX.Element} JSX element containing the form for creating a new bundle.
 */
const CreateBundle = ({ reload }: BundleProps) => {
  const [message, setMessage] = useState<MessageType | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [tickets, setTickets] = useState<TicketResponse[]>([]);

  useEffect(() => {
    getTickets().then((ticketsList) => setTickets(ticketsList));
  }, []);

  const handleNewTicket = async (event: FormEvent) => {
    event.preventDefault();
    const { title, description, quantity, ticket_id, discount } =
      event.target as typeof event.target & {
        title: { value: string };
        description: { value: string };
        quantity: { value: string };
        ticket_id: { value: string };
        discount: { value: string };
      };

    const bundle: Bundle = {
      title: title.value,
      description: description.value,
      quantity: parseInt(quantity.value),
      ticketId: parseInt(ticket_id.value),
      discount: parseFloat(discount.value),
    };

    const response = await createBundle(bundle);
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
    <>
      <div className="form-shadow flex flex-col p-4 space-y-2 md:w-1/2 w-11/12 mt-20 mb-10 mx-auto rounded-md">
        <h2 className="w-fit mx-auto my-2 text-3xl text-blue-500 font-bold">
          New bundle
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
          <label htmlFor="discount">Discount</label>
          <input
            type="text"
            name="discount"
            id="discount"
            pattern="^0(.\d{1,2})?$"
            className="form_input"
            required
          />
          <label htmlFor="ticket_id">Quantity</label>
          <input
            type="text"
            name="quantity"
            id="quantity"
            pattern="^[1-9]\d*$"
            className="form_input"
            required
          />
          <label htmlFor="ticket_id">Ticket</label>
          <select name="ticket_id" id="ticket_id">
            {tickets.map((ticket) => {
              return <option value={ticket.id} className="text-center">{ticket.title}</option>;
            })}
          </select>
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
    </>
  );
};

export default CreateBundle;
