import {  useState } from "react";
import { UserBasic, UserFullInfo, getUser } from "../../utils/apiService";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

type UserCardProps = {
  user: UserBasic;
};

const UserCard = ({ user }: UserCardProps) => {

    const [userFull, setUserFull] = useState<UserFullInfo | null>();
    const [hiddenEmail, setHiddenEmail] = useState<boolean>(true);
    const [hiddenKey, setHiddenKey] = useState<boolean>(true);


    const handleGetUserFullInfo = () => {
        if(!userFull)
            getUser(user.id).then((userInfo) => setUserFull(userInfo));
        else
            setUserFull(null);

    }

  return (
    <>
    <div className="p-2 flex justify-between w-full items-center align-middle mx-auto text-center cursor-pointer hover:bg-gray-200" onClick={handleGetUserFullInfo}>
      <p className="w-1/4">{user.name}</p>
      <p className="w-1/4">{user.firstname}</p>
      {user.isBlock ? <FaCheckCircle className="w-1/4" size={20} color="lightgreen"/>:<FaCircleXmark className="w-1/4" size={20} color="red"/>}
      {user.isVerified ? <FaCheckCircle className="w-1/4" size={20} color="lightgreen"/>:<FaCircleXmark className="w-1/4" size={20} color="red"/>}
    </div>
    { userFull &&

    <div className="flex flex-col md:flex-row md:space-x-5 w-fit mx-auto my-5">
        <div className="flex space-x-2 p-2">
            <p className="text-blue-500 font-bold">Email </p>
            <p className={`${hiddenEmail ? "font-bold":""} cursor-pointer`} onClick={() => setHiddenEmail(!hiddenEmail)}>{hiddenEmail ? userFull.email[0]+"*".repeat(userFull.email.length):userFull.email}</p>
        </div>
        <div className="flex space-x-2 p-2">
            <p className="text-blue-500 font-bold">Key </p>
            <p className={`${hiddenKey ? "font-bold":""} cursor-pointer`} onClick={() => setHiddenKey(!hiddenKey)}>{hiddenKey ? userFull.email[0]+"*".repeat(userFull.customerKey.length-1):userFull.customerKey}</p>
        </div>
    </div> 
    }
    </>
  );
};

export default UserCard;
