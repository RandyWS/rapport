import { combineReducers } from "redux";
import user from "./user";
import loggedIn from "./loggedIn";
import userFriends from "./userFriends";

const appReducer = combineReducers({
  user,
  userFriends,
  loggedIn,
});
export default appReducer;
