import { FormEvent, useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import HideShowPassword from "../../HideShowPassword";
import Message from "../Message";

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
const LoginForm = ({ loginSuccessfull }: Props) => {
  const [message, setMessage] = useState<Message>();
  const { preAuth, setToken } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Handle the state of isLogin of the parent's component
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
  const handleSubmit = async (event: FormEvent) => {
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

        //Decode the jwt
        const decodedToken = jwtDecode(token);

        //Pre auth the user for handle necessary informations related to the code confirmation
        const user = { id: decodedToken.sub, email: formData.email };
        preAuth(user);
        setToken(token);

        //Change the state of isLogin for switch to the code form.
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
        className="p-2 my-3 space-y-6 rounded-md form-shadow"
      >
        <div>
          <label htmlFor="email" className="p-2">
            Email
          </label>
          <input
            className="auth_input w-full"
            placeholder="Email"
            type="text"
            name="email"
            maxLength={250}
            required
          />
        </div>
        <div>
          <HideShowPassword showPassword={handleVisiblePassword} />
          <input
            className="auth_input w-full"
            placeholder="•••••••••"
            type={showPassword ? "text" : "password"}
            name="password"
            maxLength={250}
            required
          />
          <a
            href="/forget_password"
            className="text-xs text-blue-600 opacity-80"
          >
            Forget password
          </a>
          <br />
        </div>
        <div className="w-fit mx-auto">
          <button type="submit">
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
