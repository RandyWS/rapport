import axios from "axios";
import { setUserFriends } from "./userFriends";

const SET_USER = "SET_USER";

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const fetchUser = (username) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/user/authenticated/${username}`);
      dispatch(setUser(data.user));
    } catch (error) {
      console.log(error);
    }
  };
};

export const _fetchUser = (username, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/user/authenticated/${username}`);
      dispatch(setUser(data.user));
      dispatch(setUserFriends(data.user.friends));
      const path = `/user/${data.user.userName}`;
      history.push(path);
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};
