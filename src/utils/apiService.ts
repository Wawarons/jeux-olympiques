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
