import axios from "axios";

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
  return axios.get(`${import.meta.env.VITE_API_URL}/auth/is_auth`).then((response) => {
    return response.status === 200;
  }).catch(() => {return false});
};
