import { FormEvent, useState } from "react";
import Timer from "../../utils/Timer";
import axios from "axios";
import Message, { MessageType } from "../Message";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [messages, setMessages] = useState<MessageType | null>();
  const [newResetLinkDisable, setNewResetLinkDisable] = useState(false);
  const navigate = useNavigate();

  const DISABLE_TIME: number = 300000;

  const handleSendResetLink = async (event: FormEvent) => {
    event.preventDefault();
    const { email } = event.target as typeof event.target & {
      email: { value: string };
    };

    let response = null;
    try {
      response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/reset-password`,
        {
          email: email.value,
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.details) {
        setMessages({ message: error.response.data.details, type: "negative" });
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }

    if (response && response.status === 200) {
      setMessages({
        message: `A reset link has been send to ${email.value}`,
        type: "positive",
      });
      setMessages(null);
    }
  };

  return (
    <>
      <h1 className="form_h1">Reset your password</h1>
      <h4>Please enter your email</h4>
      <form
        method="POST"
        onSubmit={handleSendResetLink}
        className="flex flex-col items-start space-y-3 w-fit"
      >
        <Message messages={messages?.message} type={messages?.type} />
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          maxLength={250}
          className="auth_input"
        />
        <div className="flex space-x-4">
          <button
            type="submit"
            className="rounded-md p-2 button-shadow cursor-pointer"
            onClick={() => setNewResetLinkDisable(false)}
            disabled={newResetLinkDisable}
          >
            {newResetLinkDisable ? (
              <Timer
                seconds={DISABLE_TIME / 1000}
                isStart={newResetLinkDisable}
              />
            ) : (
              "Envoyer"
            )}
          </button>
          <button
            type="submit"
            className="rounded-md p-2 button-shadow cursor-pointer"
            onClick={() => navigate("/")}
            disabled={newResetLinkDisable}
          >
            Annuler
          </button>
        </div>
      </form>
    </>
  );
};

export default ForgetPassword;
