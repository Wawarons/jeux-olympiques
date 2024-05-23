import Login from "./components/authentication/login/Login";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import Signup from "./components/authentication/signup/Signup";
import ForgetPassword from "./components/authentication/login/ForgetPassword";
import NavBar from "./components/NavBar";

type Props = {
  type: "login" | "signup" | "forget_password";
  title?: string
};

/**
 * Component for handling authentication forms.
 *
 * @param {Object} Props - The props for the Authentication component.
 * @param {string} Props.type - The type of form to display, either "login" or "signup".
 *
 * @returns {JSX.Element} - The JSX element representing the Authentication component.
 */
const Authentication = ({ type, title }: Props) => {
  const [form, setForm] = useState<"login" | "signup" | "forget_password">(type);

  /**
   * Switch between "login" and "signup" for the form state
   */
  const switchForm = () => {
    const newValue = form == "login" ? "signup" : "login";
    setForm(newValue);
  };

  return (
    <>
    <NavBar/>
      <div className="flex flex-col lg:flex-row">
        <div className="bg-ceremonie-ouvertue bg-no-repeat bg-cover w-screen h-[250px] lg:w-1/3 lg:h-screen"></div>
        <div className="relative top-1/2 w-full">
          <a href="/">
            <IoArrowBack size={30} className="m-5" />
          </a>
          <div className="w-11/12 md:w-1/3 lg:w-1/4 max-md:mx-auto md:translate-x-1/2">
            <h1 className="text-5xl mx-2.5 my-11 font-bold first-letter:uppercase">
              {title ? title:form}
            </h1>
            {form == "login" && <Login />}
            {form == "signup" && <Signup/>}
            {form == "forget_password" && <ForgetPassword/>}
          </div>
        </div>
      </div>
      <p
        className="relative bottom-0 right-0 underline text-sm m-2 cursor-pointer"
        onClick={() => switchForm()}
      >
        {form == "signup" ? "Already have an account ?" : "no account ?"}
      </p>
    </>
  );
};

export default Authentication;
