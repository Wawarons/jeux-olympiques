import { useState } from "react";
import Code from "./Code";
import LoginFrom from "./LoginForm";

/**
 * Function component representing the login page.
 * Renders either the 'Code' component or the 'LoginForm' component based on the 'code' state.
 * @returns JSX.Element
 */
const Login = () => {
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
    <>{isLogin ? <Code /> : <LoginFrom loginSuccessfull={handleCodeState} />}</>
  );
};

export default Login;
