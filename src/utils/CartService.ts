import axios from "axios";

export interface TicketProps {
  id: number;
  title: string;
  description: string;
  price: number;
  startDate: Date;
  endDate: Date;
  available: boolean;
}

export interface BundleProps {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  ticket: {
    id: number;
    title: string;
    description: string;
    price: number;
    startDate: Date;
    endDate: Date;
    available: boolean;
  };
  discount: number;
  createdAt: Date;
}

export interface ItemCart {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
}

/**
 * Fetches a list of formulas from the API.
 *
 * @returns A promise that resolves to an array of BundleProps objects representing the formulas.
 */
export const getBundles = async (): Promise<BundleProps[]> => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/bundles`, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data as BundleProps[];
    });
};

/**
 * Adds an item to the user's cart based on the provided formula ID and quantity.
 *
 * @param bundleId - The ID of the formula to add to the cart.
 * @param quantity - The quantity of the formula to add to the cart.
 * @returns A boolean indicating whether the addition was successful (true) or not (false).
 * @throws An error message if an unexpected error occurs during the API call.
 */
export const addItemInCart = async (bundleId: number, quantity: number) => {
  const body = {
    bundleId,
    quantity,
  };
  return axios
    .post(`${import.meta.env.VITE_API_URL}/cart/bundle/add_item`, body, {
      withCredentials: true,
    })

    .then((response) => {
      if (response.status === 200) return true;
    })
    .catch((error) => {
      console.error("An unexpected error occured: ", error);
      return false;
    });
};

/**
 * Updates the quantity of an item in the user's cart based on the provided formula ID.
 *
 * @param bundleId - The ID of the formula whose quantity needs to be updated in the cart.
 * @param quantity - The new quantity value to be set for the formula in the cart.
 * @returns A boolean indicating whether the update was successful (true) or not (false).
 * @throws An error message if an unexpected error occurs during the API call.
 */
export const updateItemInCart = async (bundleId: number, quantity: number) => {
  const body = {
    bundleId,
    quantity,
  };
  return axios
    .post(`${import.meta.env.VITE_API_URL}/cart/bundle/update_item`, body, {
      withCredentials: true,
    })

    .then((response) => {
      return response.status === 200;
    })
    .catch((error) => {
      console.error("An unexpected error occured: ", error);
      return false;
    });
};

/**
 * Deletes an item from the user's cart based on the provided formula ID.
 *
 * @param bundleId - The ID of the formula to be deleted from the cart.
 * @returns A boolean indicating whether the deletion was successful (true) or not (false).
 * @throws An error message if an unexpected error occurs during the API call.
 */
export const deleteItemInCart = async (bundleId: number) => {
  const body = {
    bundleId,
    quantity: -1,
  };
  return axios
    .post(`${import.meta.env.VITE_API_URL}/cart/bundle/update_item`, body, {
      withCredentials: true,
    })

    .then((response) => {
      if (response.status === 200) {
        return true;
      }
    })
    .catch((error) => {
      console.error("An unexpected error occured: ", error);
      return false;
    });
};

/**
 * Retrieves the user's cart items from the API.
 *
 * @returns A promise that resolves to an array of ItemCart objects representing the user's cart items.
 * @throws An error message if an unexpected error occurs during the API call.
 */
export const getCartUser = async (): Promise<ItemCart[]> => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/cart/bundle/items`, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("An unexpected error occured: ", error);
    });
};
