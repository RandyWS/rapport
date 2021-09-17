import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function useAuth() {
  let history = useHistory();
  const { setUser } = useContext(UserContext);

  //set user in context and push them home
  const setUserContext = async () => {
    return await axios.get("/user/authenticated").then((res) => {
      setUser(res.data.user);
      history.push("/home");
    });
  };

  //register user
  const registerUser = async (data) => {
    const { username, email, password, passwordConfirm } = data;
    return axios
      .post(`auth/register`, {
        username,
        email,
        password,
        passwordConfirm,
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  //login user
  const loginUser = async () => {
    await setUserContext();
  };

  return {
    setUserContext,
    registerUser,
    loginUser,
  };
}
