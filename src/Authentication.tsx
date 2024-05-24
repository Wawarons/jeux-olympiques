import Login from "./components/authentication/login/Login";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import Signup from "./components/authentication/signup/Signup";
import ForgetPassword from "./components/authentication/login/ForgetPassword";
import NavBar from "./components/NavBar";

type Props = {
  type: "login" | "signup" | "code" | "forget_password";
};

/**
 * Component for handling authentication forms.
 *
 * @param {Object} Props - The props for the Authentication component.
 * @param {string} Props.type - The type of form to display, either "login" or "signup".
 *
 * @returns {JSX.Element} - The JSX element representing the Authentication component.
 */
const Authentication = ({ type }: Props) => {
  const [form, setForm] = useState<
    "login" | "signup" | "code" | "forget_password"
  >(type);

  /**
   * Switch between "login" and "signup" for the form state
   */
  const switchFormType = (
    typeForm: "login" | "signup" | "code" | "forget_password"
  ) => {
    setForm(typeForm);
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col lg:flex-row">
        <div className="bg-ceremonie-ouvertue bg-no-repeat bg-cover w-screen h-[250px] lg:w-1/3 lg:h-screen"></div>
        <div className="relative top-1/2 w-full">
          <a href="/">
            <IoArrowBack
              size={30}
              className="m-5 hover:scale-110 transform transition duration-300"
            />
          </a>
          <div className="min-w-fit w-fit md:w-1/2 max-md:mx-auto md:translate-x-1/2">
            {form == "login" && <Login handleFormType={switchFormType} />}
            {form == "signup" && <Signup handleFormType={switchFormType} />}
            {form == "forget_password" && <ForgetPassword />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
