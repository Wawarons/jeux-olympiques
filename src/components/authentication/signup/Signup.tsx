import SignupForm from "./SignupForm";

type Props = {
  handleFormType: (formType: "login" | "signup") => void;
}

/**
 * Functional component for handling user signup form submission.
 * Manages form data, error handling, and success message display.
 * Utilizes Axios for form submission and displays errors using the Errors component.
 * Returns a form with input fields for name, firstname, email, password, and confirm password.
 * Displays a success message upon successful form submission.
 */
const Signup = ({handleFormType}: Props) => {

  const handleIsSignup = (state: boolean) => {
    state ? handleFormType("login"):handleFormType("signup");
  }

  return (
    <>
    <h1 className="form_h1">Sign up</h1>
      <p className="w-fit font-bold cursor-pointer text-sm hover:text-blue-400" onClick={() => handleFormType("login")}>Already an account ?</p>
      <SignupForm handleIsSignup={handleIsSignup}/>
    </>
  );
};

export default Signup;
