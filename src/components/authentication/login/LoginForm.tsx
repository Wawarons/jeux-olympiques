import { FormEvent, useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import HideShowPassword from "../../HideShowPassword";
import Message from "../Message";
import { isValidEmail, isValidPassword } from "../../ValidData";

type FormData = {
  email: string;
  password: string;
};

type Props = {
  loginSuccessfull: (codeState: boolean) => void;
};

type Message = {
  message: string[] | string;
  type: "positive" | "negative" | string;
};

/**
 * Function component for rendering a login form.
 *
 * @param {Props} loginSuccessfull - Function to handle successful login state.
 *
 * @returns {JSX.Element} A form component with email and password fields for user login.
 */
const LoginForm = ({ loginSuccessfull }: Props): JSX.Element => {
  const [message, setMessage] = useState<Message>();
  const { preAuth, setToken } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [validEmail, setValidEmail] = useState<boolean | null>(null);
  const [validPassword, setValidPassword] = useState<boolean | null>(null);

  const handleStateIsLogin = (stateIsLogin: boolean) => {
    loginSuccessfull(stateIsLogin);
  };

  const handleVisiblePassword = (isVisiblePassword: boolean) => {
    setShowPassword(isVisiblePassword);
  };

  /**
   * Handles the form submission when the user tries to log in.
   *
   * @param {FormEvent} event - The form submission event.
   * @returns {void}
   */
  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    const { email, password } = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };
    const formData: FormData = { email: email.value, password: password.value };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200 && response.data) {
        const { token } = response.data;

        const decodedToken = jwtDecode(token);

        const user = { id: decodedToken.sub, email: formData.email };
        preAuth(user);
        setToken(token);

        handleStateIsLogin(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.details) {
        setMessage({
          message: error.response.data.details,
          type: "negative",
        });
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <>
      <Message messages={message?.message} type={message?.type} />
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="p-2 my-3 space-y-5 rounded-md form-shadow"
      >
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <label htmlFor="email">Email</label>
            {validEmail && <FaCheckCircle color="green" />}
          </div>
          <input
            placeholder="Email@domaine.xyz"
            className={`auth_input ${!validEmail ? "invalid_input" : ""}`}
            type="text"
            name="email"
            onChange={({ target }) => {
              setValidEmail(isValidEmail(target.value));
            }}
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <HideShowPassword showPassword={handleVisiblePassword} />
            {validPassword && <FaCheckCircle color="green" />}
          </div>
          <input
            placeholder="•••••••••"
            className={`auth_input ${!validPassword ? "invalid_input" : ""}`}
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={({ target }) => {
              setValidPassword(isValidPassword(target.value));
            }}
            required
          />
          <a
            href="/forget_password"
            className="text-xs text-blue-600 opacity-80"
          >
            Forget password
          </a>
        </div>
        <div className="w-fit mx-auto">
          <button type="submit" disabled={!(validEmail && validPassword)}>
            <FaArrowRight
              size={35}
              className="rounded-[50%] p-2 text-2xl button-shadow cursor-pointer transition duration-200 hover:drop-shadow-lg hover:bg-bg-color hover:text-or-color"
            />
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
