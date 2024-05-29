import { FormEvent, useEffect, useRef, useState } from "react";
import {
  Ticket,
  TicketResponse,
  deleteTicket,
  getTicketById,
  updateTicket,
} from "../../utils/apiService";
import Message, { MessageType } from "../authentication/Message";
import { FaTrash } from "react-icons/fa";

type UpdateTicketProps = {
  reload: (state: boolean) => void;
  isCancel: (state: boolean) => void;
  id: number;
};

/**
 * UpdateTicket component for updating a ticket.
 *
 * This component allows the user to update the details of a ticket, such as title, description, price, quantity, availability, start date, and end date.
 * It provides form inputs for each field and handles the submission of updated ticket information.
 * Users can also delete the ticket with a confirmation option.
 *
 * @param {function} isCancel - Function to handle cancellation action.
 * @param {function} reload - Function to reload the ticket data after an update or deletion.
 * @param {number} id - The ID of the ticket to be updated.
 *
 * @returns {JSX.Element} UpdateTicket component JSX elements.
 */
const UpdateTicket = ({ isCancel, reload, id }: UpdateTicketProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageType | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [ticket, setTicket] = useState<TicketResponse | null>(null);
  const [defaultStartDate, setDefaultStartDate] = useState<string>("");
  const [defaultEndDate, setDefaultEndDate] = useState<string>("");
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  useEffect(() => {
    const fetchTicket = () => {
      getTicketById(id).then((tick) => {
        setTicket(tick);
        if (tick) {
          setDefaultStartDate(formatDate(tick.startDate));
          setDefaultEndDate(formatDate(tick.endDate));
          setIsChecked(tick.isAvailable);
        }
      });
    };

    fetchTicket();
  }, [id]);

  const formatDate = (time: string): string => {
    const date = new Date(time);
    const year: number | string = date.getFullYear();
    let month: number | string = date.getMonth() + 1; // Les mois commencent à 0, donc on ajoute 1
    let day: number | string = date.getDate(); // Utilisez getDate() pour obtenir le jour du mois

    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    return `${year}-${month}-${day}`;
  };

  const handleDeleteTicket = async (event: FormEvent) => {
    event.preventDefault();
    const response = await deleteTicket(id);
    if (response) {
      setMessage({
        message: "Ticket deleted successfully !",
        type: "positive",
      });
      handleReset();
      isCancel(true);
      reload(true);
    } else setMessage({ message: "An error occured", type: "negative" });

    setTimeout(() => {
      setMessage(null);
    }, 2500);
  };

  const handleUpdateTicket = async (event: FormEvent) => {
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

    const response = await updateTicket(id, ticket);
    if (response) {
      setMessage({
        message: "Ticket updated successfully !",
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
        Update ticket
      </h2>
      <Message messages={message?.message} type={message?.type} />
      <form
        method="POST"
        className="flex flex-col p-4 space-y-2"
        ref={formRef}
        onSubmit={handleUpdateTicket}
      >
        <label htmlFor="title">
          Title <span className="text-xs opacity-45">3-25 characters</span>
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="form_input"
          defaultValue={ticket?.title}
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
          defaultValue={ticket?.description}
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
          defaultValue={ticket?.price}
          required
        />
        <label htmlFor="price">Quantity</label>
        <input
          type="text"
          name="quantity"
          id="quantity"
          pattern="\d+"
          className="form_input"
          defaultValue={ticket?.quantity}
          required
        />
        <label htmlFor="start_date">Start</label>
        <input
          type="date"
          name="start_date"
          id="start_date"
          min={new Date().toISOString().split("T")[0]}
          className="form_input"
          defaultValue={defaultStartDate}
          required
        />
        <label htmlFor="end_date">End</label>
        <input
          type="date"
          name="end_date"
          id="end_date"
          min={new Date().toISOString().split("T")[0]}
          defaultValue={defaultEndDate}
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
            onChange={() => setIsChecked(!isChecked)}
          />
        </div>
        <div className="flex justify-between w-full pt-3">
          <div className="space-x-10 ">
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-md"
            >
              Update
            </button>

            <button
              className="p-1 px-2 rounded-md border-2 border-blue-500 text-blue-500"
              onClick={() => isCancel(true)}
            >
              Cancel
            </button>
          </div>
          <div
            id="delete"
            className="p-1 px-2 rounded-md text-white cursor-pointer"
          >
            {confirmDelete ? (
              <div className="flex space-x-2">
                <p
                  className="p-2 bg-red-500 text-white rounded-md"
                  onClick={handleDeleteTicket}
                >
                  Confirm
                </p>

                <p
                  className="p-1 px-2 rounded-md border-2 border-blue-500 text-blue-500"
                  onClick={() => setConfirmDelete(false)}
                >
                  Cancel
                </p>
              </div>
            ) : (
              <FaTrash onClick={() => setConfirmDelete(true)} color="red" />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateTicket;
