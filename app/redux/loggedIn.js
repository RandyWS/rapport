import axios from "axios";
import { _fetchUser } from "./user";

const LOG_IN = "LOG_IN";

export const logIn = (loggedIn) => {
  return {
    type: LOG_IN,
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

export default (state = {}, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.loggedIn;
    default:
      return state;
  }
};
