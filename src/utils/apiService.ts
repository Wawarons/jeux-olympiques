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

export interface Bundle {
  title: string;
  description: string;
  quantity: number;
  ticketId: number;
  discount: number;
}

export interface BundleResponse {
  id: number;
  title: string;
  description: string;
  quantity: number;
  ticket: TicketResponse;
  discount: number;
  createdAt: string;
}
/**
 * Retrieves a list of bundles from the API.
 *
 * @returns {Promise<BundleResponse[]>} A promise that resolves to an array of TicketResponse objects representing the bundles.
 */

export const getBundles = async (): Promise<BundleResponse[]> => {
  const bundleList: BundleResponse[] = await axios
    .get(`${import.meta.env.VITE_API_URL}/bundles`, { withCredentials: true })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("An error occured", error);
    });

  return bundleList;
};

/**
 * Creates a new bundle by sending a POST request to the API endpoint.
 *
 * @param bundle - The bundle object containing title, description, quantity, ticketId, and discount.
 * @returns A Promise that resolves to a boolean indicating the success of the operation.
 */
export const createBundle = (bundle: Bundle): Promise<boolean> => {
  const { title, description, quantity, ticketId, discount } = bundle;
  const body = {
    title,
    description,
    quantity,
    ticketId,
    discount,
  };

  return axios
    .post(`${import.meta.env.VITE_API_URL}/admin/create/bundle`, body, {
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
 * Retrieves a bundle by its ID from the API.
 *
 * @param bundleId - The ID of the bundle to retrieve.
 * @returns A Promise that resolves to a BundleResponse object representing the retrieved bundle.
 * @throws Error if an error occurs during the API request.
 */
export const getBundleById = async (
  bundleId: number
): Promise<BundleResponse> => {
  const ticket: BundleResponse = await axios
    .get(`${import.meta.env.VITE_API_URL}/bundle/${bundleId}`, {
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
 * Updates a bundle with the provided ID using the given bundle data.
 *
 * @param id - The ID of the bundle to update.
 * @param bundle - The bundle object containing the updated information.
 * @returns A Promise that resolves to a boolean indicating the success of the update operation.
 */
export const updateBundle = (id: number, bundle: Bundle): Promise<boolean> => {
  const { title, description, quantity, discount, ticketId } = bundle;
  const body = {
    title,
    description,
    discount,
    quantity,
    ticketId,
  };

  return axios
    .put(`${import.meta.env.VITE_API_URL}/admin/bundle/${id}/update`, body, {
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
 * Deletes a bundle with the specified ID by sending a DELETE request to the server.
 *
 * @param id - The ID of the bundle to delete.
 * @returns A Promise that resolves to a boolean indicating if the deletion was successful (true) or not (false).
 */
export const deleteBundle = (id: number): Promise<boolean> => {
  return axios
    .delete(`${import.meta.env.VITE_API_URL}/admin/bundle/${id}/delete`, {
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

export interface InvoiceItem {
  id?: number;
  itemName: string;
  quantity: number;
}

/**
 * Retrieves a list of sales from the API.
 *
 * @returns {Promise<BundleResponse[]>} A promise that resolves to an array of TicketResponse objects representing the bundles.
 */
export const getAllInvoiceItems = (): Promise<InvoiceItem[]> => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/invoice_item/items`, {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export interface UserBasic {
  id: number;
  name: string;
  firstname: string;
  isBlock: boolean;
  isVerified: boolean;
}

export interface UserFullInfo {
  id: number;
  name: string;
  firstname: string;
  email: string;
  isBlock: boolean;
  isVerified: boolean;
  customerKey: string;
}

/**
 * Retrieves a list of users from the API.
 *
 * This function makes a GET request to the server to fetch a list of users.
 *
 * @returns {Promise<UserBasic[]>} A promise that resolves to an array of UserBasic objects representing the users.
 * @throws Error if an error occurs during the API request.
 */
export const getUsers = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/admin/users`, {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Retrieves user information by making a GET request to the server.
 *
 * @param userId - The ID of the user to retrieve information for.
 * @returns A Promise that resolves to the user data.
 * @throws Error if an error occurs during the API request.
 */
export const getUser = (userId: number) => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/admin/user/${userId}`, {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Initiates the payment process by sending a POST request to the payment endpoint.
 *
 * @returns {Promise<boolean>} A promise that resolves to true if the payment process was successful, otherwise false.
 */
export const proceedPayement = () => {
  return axios
    .post(
      `${import.meta.env.VITE_API_URL}/paiement/proceed`,
      {},
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      return response.status === 200;
    })
    .catch((error) => {
      console.log(error);
    });
};
