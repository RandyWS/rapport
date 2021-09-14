import axios from "axios";
import { _fetchUser, setUser } from "./user";
import { setUserFriends } from "./userFriends";

const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";

export const logIn = (loggedIn) => {
  return {
    type: LOG_IN,
    loggedIn,
  };
};

export const logOut = (loggedIn) => {
  return {
    type: LOG_OUT,
    loggedIn,
  };
};

export const _logIn = (credentials, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/user/login`, credentials);
      dispatch(logIn(data));
      if (data.loggedIn === true) {
        dispatch(_fetchUser(credentials.username, history));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const _logOut = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/user/logout");
      dispatch(logOut(data));
      dispatch(setUser({}));
      dispatch(setUserFriends([]));
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.loggedIn;
    case LOG_OUT:
      return action.loggedIn;
    default:
      return state;
  }
};
