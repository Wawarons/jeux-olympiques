import { FormEvent, useState } from "react";
import Timer from "../../Timer";
import axios from "axios";

const ForgetPassword = () => {
    const [message, setMessage] = useState("");
    const [newResetLinkDisable, setNewResetLinkDisable] = useState(false);

    const DISABLE_TIME: number = 300000;

  const handleSendResetLink = async (event: FormEvent) => {
    event.preventDefault();
    console.log("TEST")!
    const { email } = event.target as typeof event.target & {
      email: {value: string}
    }

    let response = null;
    try {
        response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
          "email": email.value
        });

    } catch (error) {
        if(axios.isAxiosError(error)) {
            console.log(error.response);
        }
    }

    if(response && response.status === 200) {
        setMessage("A reset link has been send to " + email.value);
    }
  };

  return (
    <div className="">
      <p className="positive">{message}</p>
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
