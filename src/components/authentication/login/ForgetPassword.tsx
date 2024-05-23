import { FormEvent, useState } from "react";
import Timer from "../../Timer";
import axios from "axios";
import Message, { MessageType } from "../Message";

const ForgetPassword = () => {
    const [messages, setMessages] = useState<MessageType | null>();
    const [newResetLinkDisable, setNewResetLinkDisable] = useState(false);

    const DISABLE_TIME: number = 300000;

  const handleSendResetLink = async (event: FormEvent) => {
    event.preventDefault();
    const { email } = event.target as typeof event.target & {
      email: {value: string}
    }

    let response = null;
    try {
        response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
          "email": email.value
        });

    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.details) {
        setMessages({message: error.response.data.details, type: "negative"});
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }

    if(response && response.status === 200) {
        setMessages({message:`A reset link has been send to ${email.value}`, type: "positive"});
        setMessages(null);
    }
  };

  return (
    <div className="">
      <Message messages={messages?.message} type={messages?.type} />
      <form
        method="POST"
        onSubmit={handleSendResetLink}
        className="flex flex-col items-start space-y-3"
      >
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          maxLength={250}
          className="auth_input"
        />
        <button type="submit"
          className="rounded-md p-2 button-shadow cursor-pointer"
          onClick={() => setNewResetLinkDisable(false)}
          disabled={newResetLinkDisable}
        >
          {newResetLinkDisable ? (
            <Timer seconds={DISABLE_TIME / 1000} isStart={newResetLinkDisable} />
          ) : (
            "Send link"
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
