import { combineReducers } from "redux";
import user from "./user";
import loggedIn from "./loggedIn";
import userFriends from "./userFriends";
import contacts from "./contacts";
import authMessage from "./authMessage";
import singleContact from "./singleContact";
import singleFriend from "./userSingleFriend";
import isLoading from "./isLoading";

const appReducer = combineReducers({
  user,
  userFriends,
  loggedIn,
  contacts,
  authMessage,
  singleContact,
  singleFriend,
  isLoading,
});

export default appReducer;
