import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
  ReactNode,
  Reducer,
} from "react";

/**
 * Represents the interface definition for a User object, including authentication status, id, email, and roles.
 */
interface User {
  isAuth: boolean;
  id: string | null;
  email: string;
  roles: string[];
}

/**
 * Interface representing the state of authentication, containing a user object.
 */
interface AuthState {
  user: User;
}

/**
 * Represents the type definition for the AuthContext, including user information, token, and various authentication-related functions.
 */
interface AuthContextType {
  user: User;
  token: string | null;
  preAuth: (userData: Partial<User>) => void;
  login: (userData: Partial<User>) => void;
  logout: () => void;
  setToken: (token: string) => void;
}

/**
 * Defines the possible actions for the authentication context reducer.
 */
type AuthAction =
  | { type: "PRE_AUTH"; payload: Partial<User> }
  | { type: "LOGIN"; payload: Partial<User> }
  | { type: "LOCAL_USER"; payload: Partial<User> }
  | { type: "LOGOUT" };

/**
 * Represents the type definition for the Props object, which includes children of type ReactNode.
 */
type Props = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

const initState: AuthState = {
  user: {
    isAuth: false,
    id: null,
    email: "",
    roles: [],
  },
};

const userReducer: Reducer<AuthState, AuthAction> = (state, action) => {
  switch (action.type) {
    case "PRE_AUTH":
      return { ...state, user: { ...state.user, ...action.payload } };
    case "LOGIN":
      return { ...state, user: { ...state.user, ...action.payload } };
    case "LOCAL_USER":
      return { ...state, user: { ...state.user, ...action.payload } };
    case "LOGOUT":
      return initState;
    default:
      return state;
  }
};

/**
 * AuthProvider component manages the authentication state and user token.
 * It initializes the user state, handles user authentication, token management,
 * and user logout functionality. It also interacts with the backend API to
 * claim and validate user tokens.
 *
 * @param {Props} children - The child components to be wrapped by the AuthProvider.
 * @returns {JSX.Element} - The JSX element containing the AuthContext.Provider with the user state and functions.
 */
const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer<Reducer<AuthState, AuthAction>>(
    userReducer,
    initState
  );
  const [token, _setToken] = useState<string | null>(null);

  /**
   * Checks if the access token is present in the document's cookies.
   *
   * @returns {boolean} Returns true if the access token is present, otherwise false.
   */
  const isAccessTokenPresent = useCallback((): boolean => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.indexOf("access_token=") === 0) {
        return true;
      }
    }
    return false;
  }, []);

  /**
   * Fetches a new token by making a GET request to the API endpoint for claiming a user token.
   * If the request is successful and the response status is 200, it stores the token in local storage,
   * decodes the token to extract user information, and updates the user state with the decoded information.
   * If an error occurs during the request, it logs the error message to the console.
   */
  const claimNewToken = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/token/user/claim`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response && response.status === 200 && response.data) {
          const token = response.data.token;
          localStorage.setItem("token", JSON.stringify({ value: token }));
          const decodedToken: { sub: string; roles: string[] } =
            jwtDecode(token);
          const user = {
            isAuth: true,
            id: decodedToken.sub || "",
            roles: decodedToken.roles,
          };
          localUser(user);
        }
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }, []);

  /**
   * Asynchronous function that checks the validity of a token by making a GET request to the API endpoint for token validation.
   * It returns a Promise that resolves to a boolean indicating whether the token is valid (status code 200) or not.
   *
   * @param {string} token - The token to be validated.
   * @returns {Promise<boolean>} A Promise that resolves to true if the token is valid, false otherwise.
   */
  const checkTokenValidity = useCallback(
    async (token: string): Promise<boolean> => {
      const valid = await axios.get(
        `${import.meta.env.VITE_API_URL}/token/user/validate?token=${token}`,
        { withCredentials: true }
      );
      return valid.status === 200;
    },
    []
  );

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) token = JSON.parse(token).value;

    if (token && isAccessTokenPresent()) {
      checkTokenValidity(token).then((isValid) => {
        if (isValid) {
          const decodedToken: { sub: string; roles: string[] } =
            jwtDecode(token);
          const user = {
            isAuth: true,
            id: decodedToken.sub || "",
            roles: decodedToken.roles,
          };
          localUser(user);
        } else {
          localStorage.removeItem("token");
          if (isAccessTokenPresent()) claimNewToken();
        }
      });
    } else {
      localStorage.removeItem("token");
      if (isAccessTokenPresent()) claimNewToken();
    }
  }, [isAccessTokenPresent, claimNewToken, checkTokenValidity]);

  /**
   * Pre-authenticates a user by dispatching an action to update the user state with the provided user data.
   *
   * @param {Partial<User>} userData - The partial user data to be used for pre-authentication.
   */
  const preAuth = (userData: Partial<User>) => {
    dispatch({ type: "PRE_AUTH", payload: userData });
  };

  /**
   * Updates the token to null and dispatches an action to log in the user with the provided user data.
   *
   * @param {Partial<User>} userData - The partial user data to be used for logging in.
   */
  const login = (userData: Partial<User>) => {
    _setToken(null);
    dispatch({ type: "LOGIN", payload: userData });
  };

  /**
   * Updates the token value with the provided token string.
   *
   * @param {string} token - The token string to set as the new token value.
   */
  const setToken = (token: string) => {
    _setToken(token);
  };

  /**
   * Updates the local user data by dispatching an action to update the user state with the provided user data.
   *
   * @param {Partial<User>} userData - The partial user data to be used for updating the local user data.
   */
  const localUser = (userData: Partial<User>) => {
    dispatch({ type: "LOCAL_USER", payload: userData });
  };

  /**
   * Logout the user by dispatching an action to update the user state.
   */
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, token, preAuth, login, logout, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

/**
 * Custom hook that provides access to the authentication context.
 * Throws an error if used outside of the AuthProvider.
 *
 * @returns {AuthContextType} The authentication context containing user data and authentication functions.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
