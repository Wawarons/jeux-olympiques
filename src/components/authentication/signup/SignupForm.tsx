import axios from "axios";
import { FormEvent, useState } from "react";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import {
  isValidName,
  isValidEmail,
  isValidPassword,
} from "../../../utils/ValidData";
import HideShowPassword from "../../utils/HideShowPassword";
import Message, { MessageType } from "../Message";

interface FormData {
  name: string;
  firstname: string;
  email: string;
  password: string;
}

type Props = {
  handleIsSignup: (state: boolean) => void;
};

const SignupForm = ({ handleIsSignup }: Props) => {
  const [messages, setMessages] = useState<MessageType | null>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [validEmail, setValidEmail] = useState<boolean | null>(null);
  const [validName, setValidName] = useState<boolean | null>(null);
  const [validFirstname, setValidFirstname] = useState<boolean | null>(null);
  const [validPassword, setValidPassword] = useState<boolean | null>(null);
  const [validConfirmPassword, setValidConfirmPassword] = useState<
    boolean | null
  >(null);

  const handleVisiblePassword = (isVisiblePassword: boolean) => {
    setShowPassword(isVisiblePassword);
  };

  const handleVisibleConfirmPassword = (isVisiblePassword: boolean) => {
    setShowConfirmPassword(isVisiblePassword);
  };

  /**
   * Handles the form submission for user signup.
   * Extracts input values from the form, validates the password confirmation,
   * sends a POST request to the signup API endpoint with form data,
   * and updates the state with success message or error messages accordingly.
   *
   * @param event - The form submission event.
   * @returns void
   */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { firstname, name, email, password, confirm_password } =
      event.target as typeof event.target & {
        name: { value: string };
        firstname: { value: string };
        email: { value: string };
        password: { value: string };
        confirm_password: { value: string };
      };

    const formData: FormData = {
      name: name.value,
      firstname: firstname.value,
      email: email.value,
      password: password.value,
    };

    if (formData.password !== confirm_password.value) {
      setMessages({
        message: "Password and confirm password are different",
        type: "negative",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        formData,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );

      if (response.data && response.status === 201) {
        setMessages({
          message: `Welcome, ${formData.firstname}! Your account has been successfully created.`,
          type: "positive",
        });
        setTimeout(() => {
          handleIsSignup(true);
        }, 2500);
      }
    } catch (error) {
      if (error && axios.isAxiosError(error)) {
        if (error.response?.data.error === "Email already use") {
          setMessages({
            message: "Email already use.",
            type: "negative",
          });
        } else if (
          error.response?.status === 400 &&
          error.response?.data.details
        ) {
          setMessages({
            message: error.response.data.details,
            type: "negative",
          });
        }
      } else {
        setMessages({
          message: "An error occured, please try again.",
          type: "negative",
        });
        console.error("Error: " + error);
      }
    }
  };

  return (
    <>
      <Message messages={messages?.message} type={messages?.type} />
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="my-5 p-2 space-y-6 form-shadow rounded-lg max-w-[500px] h-fit"
        onChange={() => setMessages(null)}
      >
        <div className="flex flex-col lg:flex-row justify-between max-lg:space-y-6 lg:space-x-5">
          <div className="w-full">
            <div className="flex items-center space-x-2">
              <label htmlFor="name">Name</label>
              {validName && <FaCheckCircle color="green" />}
            </div>
            <input
              placeholder="Name"
              className={`auth_input ${!validName ? "invalid_input" : ""}`}
              type="text"
              name="name"
              onChange={({ target }) => {
                setValidName(isValidName(target.value));
              }}
              aria-label="name"
              required
            />
          </div>
          <div className="w-full">
            <div className="flex items-center space-x-2">
              <label htmlFor="firstname">Firstname</label>
              {validFirstname && <FaCheckCircle color="green" />}
            </div>
            <input
              placeholder="Firstname"
              className={`auth_input ${!validFirstname ? "invalid_input" : ""}`}
              type="text"
              name="firstname"
              aria-label="firstname"
              onChange={({ target }) => {
                setValidFirstname(isValidName(target.value));
              }}
              required
            />
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <label htmlFor="email">Email</label>
            {validEmail && <FaCheckCircle color="green" />}
          </div>
          <input
            placeholder="Email@domaine.xyz"
            className={`auth_input ${!validEmail ? "invalid_input" : ""}`}
            type="text"
            name="email"
            aria-label="email"
            onChange={({ target }) => {
              setValidEmail(isValidEmail(target.value));
            }}
            required
          />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <HideShowPassword showPassword={handleVisiblePassword} />
            {validPassword && <FaCheckCircle color="green" />}
          </div>
          <input
            placeholder="•••••••••"
            className={`auth_input ${!validPassword ? "invalid_input" : ""}`}
            type={showPassword ? "text" : "password"}
            name="password"
            aria-label="password"
            onChange={({ target }) => {
              setValidPassword(isValidPassword(target.value));
            }}
            required
          />
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <HideShowPassword
              showPassword={handleVisibleConfirmPassword}
              title="Confirm password"
            />
            {validConfirmPassword && <FaCheckCircle color="green" />}
          </div>
          <input
            placeholder="•••••••••"
            className={`auth_input ${!validPassword ? "invalid_input" : ""}`}
            type={showConfirmPassword ? "text" : "password"}
            name="confirm_password"
            aria-label="confirm_password"
            onChange={({ target }) => {
              setValidConfirmPassword(isValidPassword(target.value));
            }}
            required
          />
        </div>
        <div className="w-fit mx-auto">
          <button
            type="submit"
            disabled={
              !(
                validEmail &&
                validFirstname &&
                validName &&
                validPassword &&
                validConfirmPassword
              )
            }
          >
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

export default SignupForm;
