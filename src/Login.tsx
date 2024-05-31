import { useState } from "react";
import Code from "./components/authentication/login/Code";
import LoginFrom from "./components/authentication/login/LoginForm";

type Props = {
  handleFormType: (formType: "login" | "signup" | "code") => void;
};

/**
 * Function component representing the login page.
 * Renders either the 'Code' component or the 'LoginForm' component based on the 'code' state.
 * @returns JSX.Element
 */
const Login = ({ handleFormType }: Props) => {
  const [isLogin, setIsLogin] = useState(false);

  /**
   * Update the state of isLogin
   * @param isLogin
   * @type boolean
   */
  const handleCodeState = (isLoginState: boolean) => {
    setIsLogin(isLoginState);
  };

  return (
    // If the user is successfully authentified change the state of {isLogin} to true for show the validation code form
    <>
      {!isLogin && (
        <>
          <h1 className="form_h1">Login</h1>
          <p
            className="w-fit font-bold cursor-pointer text-sm hover:text-blue-400"
            onClick={() => handleFormType("signup")}
          >
            No account ?
          </p>
        </>
      )}
      <>
        {isLogin ? <Code /> : <LoginFrom loginSuccessfull={handleCodeState} />}
      </>
    </>
  );
};

export default Login;
