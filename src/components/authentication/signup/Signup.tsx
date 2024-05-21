import axios from "axios";
import { FormEvent, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import HideShowPassword from "../../HideShowPassword";
import Message, { MessageType } from "../Message";

interface FormData {
  name: string;
  firstname: string;
  email: string;
  password: string;
}

/**
 * Functional component for handling user signup form submission.
 * Manages form data, error handling, and success message display.
 * Utilizes Axios for form submission and displays errors using the Errors component.
 * Returns a form with input fields for name, firstname, email, password, and confirm password.
 * Displays a success message upon successful form submission.
 */
const Signup: React.FC = () => {
  const [messages, setMessages] = useState<MessageType | null>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

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

    //Extract all inputs values
    const form = event.currentTarget;
    const nameInput = (form.elements.namedItem("name") as HTMLInputElement)
      .value;
    const firstnameInput = (
      form.elements.namedItem("firstname") as HTMLInputElement
    ).value;
    const emailInput = (form.elements.namedItem("email") as HTMLInputElement)
      .value;
    const passwordInput = (
      form.elements.namedItem("password") as HTMLInputElement
    ).value;

    const formData: FormData = {
      name: nameInput,
      firstname: firstnameInput,
      email: emailInput,
      password: passwordInput,
    };

    console.log(passwordInput, form["confirm-password"].value);
    if (passwordInput !== form["confirm-password"].value) {
      setMessages({
        message: "Password and confirm password are different",
        type: "negative",
      });
      return;
    }
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((response) => {
        if (response.data && response.data.status === 201) {
          setMessages({
            message: `Welcome, ${formData.firstname}! Your account has been successfully created.`,
            type: "positive",
          });
        }
      })
      .catch(function (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.details
        ) {
          setMessages({
            message: error.response.data.details,
            type: "negative",
          });
        } else {
          console.error(error);
        }
      });
  };

  return (
    <>
      <Message messages={messages?.message} type={messages?.type}/>
      <form method="POST" onSubmit={handleSubmit} className="p-2 space-y-6">
        <div className="flex flex-col lg:flex-row justify-between max-md:space-y-6 space-x-5">
          <div className="w-full">
            <label htmlFor="name">Name</label>
            <br />
            <input
              placeholder="Name"
              className="auth_input"
              type="text"
              name="name"
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="firstname">Firstname</label>
            <br />
            <input
              placeholder="Firstname"
              className="auth_input "
              type="text"
              name="firstname"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            placeholder="Email@domaine.xyz"
            className="auth_input w-full"
            type="text"
            name="email"
            required
          />
        </div>
        <div>
          <HideShowPassword showPassword={handleVisiblePassword} />
          <input
            placeholder="•••••••••"
            className="auth_input w-full"
            type={showPassword ? "password" : "text"}
            name="password"
            required
          />
        </div>

        <div>
          <HideShowPassword
            showPassword={handleVisibleConfirmPassword}
            title="Confirm password"
          />
          <input
            placeholder="•••••••••"
            className="auth_input w-full"
            type={showConfirmPassword ? "password" : "text"}
            name="confirm-password"
            required
          />
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

export default Signup;
