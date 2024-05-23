import axios from "axios";

/**
 * Asynchronous function that checks the validity of a token by making a GET request to the API endpoint for token validation.
 * It returns a Promise that resolves to a boolean indicating whether the token is valid (status code 200) or not.
 *
 * @param {string} token - The token to be validated.
 * @returns {Promise<boolean>} A Promise that resolves to true if the token is valid, false otherwise.
 */
export const checkTokenValidity = (token: string): Promise<boolean> => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/token/user/validate?token=${token}`, { withCredentials: true })
    .then(response => response.status === 200).catch(() => {
        return false;
    })};

/**
 * Checks if the access token is present in the document's cookies.
 *
 * @returns {boolean} Returns true if the access token is present, otherwise false.
 */
export const isAccessTokenPresent = (): boolean => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.indexOf("token=") === 0) {
      return true;
    }
  }
  return false;
};
