import { combineReducers } from "redux";
import user from "./user";
import loggedIn from "./loggedIn";
import userFriends from "./userFriends";
import contacts from "./contacts";
import authMessage from "./authMessage";

const appReducer = combineReducers({
  user,
  userFriends,
  loggedIn,
  contacts,
  authMessage,
});

export default appReducer;
