import axios from "axios";
/**
 * Checks the validity of a given access token by making a GET request to the server.
 *
 * @param token - The access token to be validated.
 * @returns A Promise that resolves to a boolean indicating if the token is valid (true) or not (false).
 */
export const checkTokenValidity = (token: string): Promise<boolean> => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/token/user/validate?token=${token}`, {
      withCredentials: true,
    })
    .then((response) => {
      return response.status === 200;
    })
    .catch(() => {
      return false;
    });
};

/**
 * Checks if the access token is present in the document's cookies.
 *
 * @returns {boolean} Returns true if the access token is present, otherwise false.
 */
export const isAccessTokenPresent = (): Promise<boolean> => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/auth/is_auth`)
    .then((response) => {
      return response.status === 200;
    })
    .catch(() => {
      return false;
    });
};

export interface Ticket {
  title: string;
  description: string;
  price: number;
  quantity: number;
  isAvailable: boolean;
  startDate: string;
  endDate: string;
}

export interface TicketResponse {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  isAvailable: boolean;
  startDate: string;
  endDate: string;
}

/**
 * Creates a new ticket by sending a POST request to the server.
 *
 * @param ticket - The ticket object containing details of the ticket to be created.
 * @returns A Promise that resolves to a boolean indicating if the ticket was successfully created (true) or not (false).
 */
export const createTicket = (ticket: Ticket): Promise<boolean> => {
  const {
    title,
    description,
    price,
    quantity,
    isAvailable,
    startDate,
    endDate,
  } = ticket;
  const body = {
    title,
    description,
    price,
    quantity,
    isAvailable,
    startDate: new Date(startDate).toISOString(),
    endDate: new Date(endDate).toISOString(),
  };

  return axios
    .post(`${import.meta.env.VITE_API_URL}/admin/ticket/create`, body, {
      withCredentials: true,
    })
    .then((response) => {
      return response.status === 201;
    })
    .catch(() => {
      return false;
    });
};

/**
 * Updates a ticket with the provided ID using the given ticket data.
 *
 * @param id - The ID of the ticket to update.
 * @param ticket - The ticket data containing the new information.
 * @returns A Promise that resolves to a boolean indicating if the update was successful.
 */
export const updateTicket = (id: number, ticket: Ticket): Promise<boolean> => {
  const {
    title,
    description,
    price,
    quantity,
    isAvailable,
    startDate,
    endDate,
  } = ticket;
  const body = {
    title,
    description,
    price,
    quantity,
    isAvailable,
    startDate: new Date(startDate).toISOString(),
    endDate: new Date(endDate).toISOString(),
  };

  return axios
    .post(`${import.meta.env.VITE_API_URL}/admin/ticket/${id}/update`, body, {
      withCredentials: true,
    })
    .then((response) => {
      return response.status === 200;
    })
    .catch(() => {
      return false;
    });
};

/**
 * Deletes a ticket with the specified ID by sending a DELETE request to the server.
 *
 * @param id - The ID of the ticket to delete.
 * @returns A Promise that resolves to a boolean indicating if the deletion was successful (true) or not (false).
 */
export const deleteTicket = (id: number): Promise<boolean> => {
  return axios
    .delete(`${import.meta.env.VITE_API_URL}/admin/ticket/${id}/delete`, {
      withCredentials: true,
    })
    .then((response) => {
      return response.status === 200;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};

/**
 * Retrieves a ticket by its ID from the API.
 *
 * @param ticketId - The ID of the ticket to retrieve.
 * @returns A Promise that resolves to a TicketResponse object representing the ticket.
 * @throws Error if an error occurs during the API request.
 */
export const getTicketById = async (
  ticketId: number
): Promise<TicketResponse> => {
  const ticket: TicketResponse = await axios
    .get(`${import.meta.env.VITE_API_URL}/ticket/${ticketId}`, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("An error occured", error);
    });

  return ticket;
};

/**
 * Retrieves a list of tickets from the API.
 *
 * @returns {Promise<TicketResponse[]>} A promise that resolves to an array of TicketResponse objects representing the tickets.
 */
export const getTickets = async (): Promise<TicketResponse[]> => {
  const ticketList: TicketResponse[] = await axios
    .get(`${import.meta.env.VITE_API_URL}/tickets`, { withCredentials: true })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("An error occured", error);
    });

  return ticketList;
};
