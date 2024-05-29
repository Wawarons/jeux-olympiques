import { useEffect, useState } from "react";
import { TicketResponse, getTickets } from "../../utils/apiService";
import CreateTicket from "./CreateTicket";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import UpdateTicket from "./UpdateTicket";
import { TbTicketOff } from "react-icons/tb";

/**
 * Function component that displays a list of tickets and allows for creating or updating tickets.
 * Uses state to manage ticket data and editing state.
 * Makes API calls to fetch, create, update, and delete tickets.
 *
 * @returns JSX.Element
 */
const Tickets = () => {
  const [tickets, setTickets] = useState<TicketResponse[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [ticketId, setTicketId] = useState(-1);
  const [editTicket, setEditTicket] = useState(false);

  useEffect(() => {
    getTickets().then((ticketList) => setTickets(ticketList));
    setReload(false);
  }, [reload]);

  const handleReload = (isRealod: boolean) => {
    setReload(isRealod);
  };

  const handleUpdateCancel = (isUpdateCancel: boolean) => {
    isUpdateCancel ? setEditTicket(false) : null;
  };

  const handeleUpdateTicket = (id: number) => {
    setTicketId(id);
    setEditTicket(true);
  };

  return (
    <>
      {editTicket ? (
        <UpdateTicket
          reload={handleReload}
          isCancel={handleUpdateCancel}
          id={ticketId}
        />
      ) : (
        <CreateTicket reload={handleReload} />
      )}
      <div className="form-shadow w-11/12 md:w-3/4 mx-auto my-10 rounded-lg">
        <div className="flex w-full mx-auto text-center bg-blue-500 text-white rounded-t-lg">
          <p className="w-1/6 text-lg font-semibold mx-auto p-2">Id</p>
          <p className="w-1/6 text-lg font-semibold mx-auto p-2">Title</p>
          <p className="w-1/6 text-lg font-semibold mx-auto p-2">Available</p>
          <p className="w-1/6 text-lg font-semibold mx-auto p-2">Price</p>
          <p className="w-1/6 text-lg font-semibold mx-auto p-2">Start</p>
          <p className="w-1/6 text-lg font-semibold mx-auto p-2">End</p>
        </div>
        {tickets
          ?.sort((ticket1, ticket2) => ticket2.id - ticket1.id)
          .map((ticket, index) => {
            return (
              <div
                key={index}
                className="p-2 flex w-full mx-auto border-blue-200 border-t-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handeleUpdateTicket(ticket.id)}
              >
                <div className=" text-md md:text-xl space-x-2 md:space-x-5 flex items-center w-full text-center">
                  <p className="w-1/6">{index + 1}</p>
                  <p className="w-1/6">{ticket.title}</p>
                  <p className="w-1/6">
                    {ticket.isAvailable ? (
                      <FaCheckCircle
                        className="w-fit mx-auto"
                        color="lightgreen"
                      />
                    ) : (
                      <FaCircleXmark className="w-fit mx-auto" color="red" />
                    )}
                  </p>
                  <p className="w-1/6">{ticket.price}</p>
                  <p className="w-1/6">
                    {new Date(ticket.startDate).toLocaleDateString("fr")}
                  </p>
                  <p className="w-1/6">
                    {new Date(ticket.endDate).toLocaleDateString("fr")}
                  </p>
                </div>
              </div>
            );
          })}
        {tickets.length < 1 && (
          <h2 className="text-xl w-fit p-2 mx-auto flex items-center">
            No tickets <TbTicketOff className="mx-2" size={20} />
          </h2>
        )}
      </div>
    </>
  );
};

export default Tickets;
