import { useContext } from "react";
import { AppContext } from "../Context/Context";

const UseAuth = () => {
  const { isLoggedin } = useContext(AppContext);
  return isLoggedin;
};

export default UseAuth;
