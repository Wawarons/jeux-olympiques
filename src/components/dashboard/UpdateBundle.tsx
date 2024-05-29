import { FormEvent, useEffect, useRef, useState } from "react";
import Message, { MessageType } from "../authentication/Message";
import {
  Bundle,
  BundleResponse,
  TicketResponse,
  deleteBundle,
  getBundleById,
  getTickets,
  updateBundle,
} from "../../utils/apiService";
import { FaTrash } from "react-icons/fa";

type UpdateTicketProps = {
  reload: (state: boolean) => void;
  isCancel: (state: boolean) => void;
  id: number;
};

/**
 * UpdateBundle component for updating a bundle.
 *
 * @param {UpdateTicketProps} props - The props for the component.
 * @param {number} props.id - The id of the bundle to update.
 * @param {function} props.reload - Function to reload the component state.
 * @param {function} props.isCancel - Function to handle cancellation state.
 *
 * @returns {JSX.Element} JSX element representing the UpdateBundle component.
 */
const UpdateBundle = ({ id, reload, isCancel }: UpdateTicketProps) => {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageType | null>();
  const formRef = useRef<HTMLFormElement>(null);
  const [bundle, setBundle] = useState<BundleResponse>();
  const [tickets, setTickets] = useState<TicketResponse[]>([]);

  useEffect(() => {
    const fetchBundle = () => {
      getBundleById(id).then((bund) => {
        setBundle(bund);
      });
    };

    getTickets().then((ticketsList) => setTickets(ticketsList));

    fetchBundle();
  }, [id]);

  const handleReset = () => {
    if (formRef.current) formRef.current.reset();
  };

  const handleUpdateBundle = async (event: FormEvent) => {
    event.preventDefault();
    const { title, description, quantity, discount, ticket_id } =
      event.target as typeof event.target & {
        title: { value: string };
        description: { value: string };
        quantity: { value: string };
        discount: { value: string };
        ticket_id: { value: string };
      };

    const bundle: Bundle = {
      title: title.value,
      description: description.value,
      quantity: parseInt(quantity.value),
      discount: parseFloat(discount.value),
      ticketId: parseInt(ticket_id.value),
    };

    const response = await updateBundle(id, bundle);
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

  const handleDeleteBundle = async (event: FormEvent) => {
    event.preventDefault();
    const response = await deleteBundle(id);
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

  return (
    <div className="form-shadow flex flex-col p-4 space-y-2 md:w-1/2 w-11/12 mt-20 mb-10 mx-auto rounded-md">
      <h2 className="w-fit mx-auto my-2 text-3xl text-blue-500 font-bold">
        Update bundle
      </h2>
      <Message messages={message?.message} type={message?.type} />
      <form
        method="POST"
        className="flex flex-col p-4 space-y-2"
        ref={formRef}
        onSubmit={handleUpdateBundle}
      >
        <label htmlFor="title">
          Title <span className="text-xs opacity-45">3-25 characters</span>
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="form_input"
          defaultValue={bundle?.title}
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
          defaultValue={bundle?.description}
          minLength={10}
          maxLength={250}
          required
        ></textarea>
        <label htmlFor="quantity">Discount</label>
        <input
          type="text"
          name="discount"
          id="discount"
          pattern="^0.\d{1,2}$"
          className="form_input"
          defaultValue={bundle?.discount}
          required
        />
        <label htmlFor="quantity">Quantity</label>
        <input
          type="text"
          name="quantity"
          id="quantity"
          pattern="^[1-9]\d*(\.\d{1,5})?$"
          className="form_input"
          defaultValue={bundle?.quantity}
          required
        />
        <select name="ticket_id" id="ticket_id">
          {tickets.map((ticket) => {
            return (
              <option value={ticket.id} className="text-center">
                {ticket.title}
              </option>
            );
          })}
        </select>
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
                  onClick={handleDeleteBundle}
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

export default UpdateBundle;
