import { useState, createContext } from "react";
import axios from "axios";
import { IUser } from "../types/modeltypes";
import { tcWrapper } from "./util";

interface IUserContex {
  user: IUser;
  loading: string;
  error: string;
  signUpUser: Function;
  updateUserInfo: Function;
  getUserInfo: Function;
  deleteUserInfo: Function;
  logOut: Function;
}

export const UserContext = createContext({} as IUserContex);

export default function useUsers() {
  const [user, set_user] = useState({} as IUser);
  const [loading, set_loading] = useState("");
  const [error, set_error] = useState("");

  const options = (type: string, id: string, data = {}) => ({
    method: type,
    url: `${process.env.REACT_APP_hostURL}/users` + id,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    qs: {},
    data,
    json: true,
  });

  const signUpUser = async (newUserData: IUser) => {
    await axios(options("POST", "", newUserData));
  };

  const getUserInfo = async (userId: string) => {
    const userData = await axios(options("GET", "/" + userId));
    if (userData.data && userData.data.user) set_user(userData.data.user);
    else return false;
  };

  const updateUserInfo = async (newUser: IUser) => {
    const userInfo = await axios(options("PUT", "", newUser));
    set_user(userInfo.data);
  };

  const deleteUserInfo = async (userId: string) => {
    await axios(options("DELETE", "/" + userId));
    //logout sequence
  };

  const logOut = () => {
    set_user({} as IUser);
  };

  tcWrapper(
    [signUpUser, getUserInfo, updateUserInfo, deleteUserInfo],
    set_loading,
    set_error
  );

  const userData = {
    user,
    loading,
    error,
    signUpUser,
    updateUserInfo,
    getUserInfo,
    deleteUserInfo,
    logOut,
  };

  const UserContextProvider = (props) => {
    return (
      <UserContext.Provider value={userData}>
        {props.children}
      </UserContext.Provider>
    );
  };

  return {
    UserContextProvider,
  };
}
