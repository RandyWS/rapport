import { combineReducers } from "redux";
import user from "./user";
import loggedIn from "./loggedIn";
import userFriends from "./userFriends";
import contacts from "./contacts";

const appReducer = combineReducers({
  user,
  userFriends,
  loggedIn,
  contacts,
});

export default appReducer;
