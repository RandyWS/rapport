import axios from "axios";

const SET_USER = "SET_USER";

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const fetchUser = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/user/${userId}`);
      dispatch(setUser(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const _fetchUser = (username) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/user/authenticated/${username}`);
      dispatch(setUser(data));
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
