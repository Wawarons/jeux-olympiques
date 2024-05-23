import { FormEvent, useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import Timer from "../../Timer";
import axios from "axios";
import Message, { MessageType } from "../Message";

/**
 * Function component representing a form for entering and validating a code for authentication.
 *
 * This component includes functionality for handling form submission, validating user input, sending a new code,
 * displaying error messages, and managing a timer for sending a new code.
 *
 * @returns JSX.Element
 */
const Code = () => {
  const [messages, setMessages] = useState<MessageType | null>();
  const [newCodeDisable, setNewCodeDisable] = useState(false);
  const { user, login, token } = useAuth();
  const DISABLE_TIME = 300000;

  const handleNewCodeTimer = () => {
    setNewCodeDisable(true);
    setTimeout(() => {
      setNewCodeDisable(false);
    }, DISABLE_TIME);
  };

  const validData = (formData: FormData) => {
    const code: string | null = (formData.get("code") as string);

    if (!code.match("[0-9]{6}")) {
      setMessages({message:["Code must only contains digits."], type: "negative"});
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    if (!validData(formData)) return;
    const body = {
      code: formData.get("code"),
      userId: user.id,
    };

    let response = null;
    try {
      response = await axios.post(
        import.meta.env.VITE_API_URL + "/auth/code/validate",
        body,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data?.details?.includes("code invalid.")) {
          setMessages({message: "code invalid.", type: "negative"});
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }

    if (response && response.status === 200) {
      localStorage.setItem("token", JSON.stringify({ value: token }));
      const userData = {
        email: "",
        isAuth: true,
      };
      login(userData);
    }
  };

  const sendNewCode = async () => {
    const body = {
      email: user.email,
      userId: user.id,
    };
    let response = null;
    try {
      response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/code/claim`,
        body,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
    } catch (error) {
      console.error("Code: " + error);
    }

    if (response && response.status == 200) {
      setMessages({message: `New code has been send to ${user.email}`, type:"positive"});
      setTimeout(() => {
        setMessages(null);
      }, 5000);
      handleNewCodeTimer();
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Message messages={messages?.message} type={messages?.type} />

      <form method="POST" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Code</label>
          <br />
          <input
            className="auth_input"
            type="text"
            name="code"
            maxLength={6}
            required
          />
        </div>
        <div className="flex space-x-5">
          <input
            className="rounded-md bg-blue-500 p-2 button-shadow cursor-pointer"
            type="submit"
            value="Send"
          />
          <button
            className="rounded-md p-2 button-shadow cursor-pointer"
            onClick={sendNewCode}
            disabled={newCodeDisable}
          >
            {newCodeDisable ? (
              <Timer seconds={DISABLE_TIME/1000} isStart={newCodeDisable} />
            ) : (
              "Send new code"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Code;
