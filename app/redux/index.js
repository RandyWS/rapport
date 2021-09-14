import { combineReducers } from "redux";
import user from "./user";
import loggedIn from "./loggedIn";

const appReducer = combineReducers({
  user: user,
  loggedIn: loggedIn,
});
export default appReducer;
