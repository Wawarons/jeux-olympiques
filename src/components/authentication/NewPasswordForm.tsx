import { FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Message, { MessageType } from "./Message";
import HideShowPassword from "../HideShowPassword";
import NavBar from "../NavBar";

const NewPasswordForm = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const [messages, setMessages] = useState<MessageType | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowconfirmPassword] =
    useState<boolean>(false);
  const token = urlParams.get("token");
  const navigate = useNavigate();

  const handleShowPassword = (isShow: boolean) => {
    setShowPassword(isShow);
  };

  const handleShowConfirmPassword = (isShow: boolean) => {
    setShowconfirmPassword(isShow);
  };

  const handleResetPassword = async (event: FormEvent) => {
    event.preventDefault();
    const { password, confirm_password } =
      event.target as typeof event.target & {
        password: { value: string };
        confirm_password: { value: string };
      };

    const formData: { confirmPassword: string; password: string } = {
      confirmPassword: confirm_password.value,
      password: password.value,
    };

    if (formData.password != formData.confirmPassword) {
      setMessages({
        message: ["Password and confirm password are different."],
        type: "negative",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/reset-password`,
        { password: formData.password },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setMessages({ message: "Password reset successful", type: "positive" });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.error("Access denied:" + error);
          setMessages({ message: "Access denied", type: "negative" });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          setMessages({ message: "An error occured, please try again.", type: "negative" });
          console.error("Error: " + error);
        }
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col relative mx-auto my-auto m-5 space-y-5 items-center w-fit">
        <h1 className="text-4xl mt-20 font-bold">Change password</h1>

        <Message messages={messages?.message} type={messages?.type} />
        <form
          method="POST"
          onSubmit={handleResetPassword}
          className="flex flex-col space-y-4 rounded-lg p-4 form-shadow"
        >
          <div>
            <HideShowPassword
              title="New password"
              showPassword={handleShowPassword}
            />
            <input
              className="auth_input"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="password"
              required
            />
          </div>
          <div>
            <HideShowPassword
              title="Confirm password"
              showPassword={handleShowConfirmPassword}
            />
            <input
              className="auth_input"
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              placeholder="confirm"
              required
            />
          </div>
          <div className="flex space-x-3 justify-center">
            <button
              type="submit"
              className="rounded-md p-2 button-shadow cursor-pointer w-1/3"
            >
              confirm
            </button>
            <button
              className="rounded-md p-2 button-shadow cursor-pointer w-1/3"
              onClick={() => navigate("/")}
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewPasswordForm;
