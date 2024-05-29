import { jwtDecode } from "jwt-decode";

export interface Roles {
  authority: string;
}

export interface decodedTokenUser {
  sub: string;
  roles: string[];
}

/**
 * Decode the provided JWT token to extract the user's sub and roles.
 * 
 * @param {string} token - The JWT token to decode.
 * @returns {decodedTokenUser} An object containing the decoded user's sub and roles.
 */
export const getDataToken = (token: string): decodedTokenUser => {
  try {
    const decodedToken: { sub: string; roles: Roles[] } = jwtDecode(token);
    const rolesUser = decodedToken.roles.map((role) => role.authority);
    return { sub: decodedToken.sub, roles: rolesUser };
  } catch (error) {
    console.error("Cannot decode the token ", error);
    return {sub: "", roles: []};
  }
};
