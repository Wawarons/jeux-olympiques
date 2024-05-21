import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

type Props = {
    title?: string,
    showPassword: (isShow: boolean) => void
}
const HideShowPassword = ({title, showPassword}: Props) => {
    const [isShow, setIsShow] = useState(false);

    const handleShowPassword = (isShowValue: boolean) => {
        showPassword(isShowValue);
        setIsShow(isShowValue);
    } 

  return (
    <div className="flex items-center space-x-2 my-2">
      <label htmlFor="password">{title ? title:"Password"}</label>
      {isShow ? (
        <IoEyeOff
          onClick={() => handleShowPassword(false)}
          className="cursor-pointer"
        />
      ) : (
        <IoEye
          onClick={() => handleShowPassword(true)}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default HideShowPassword;
