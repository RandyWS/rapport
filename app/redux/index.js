import { combineReducers } from "redux";
import user from "./user";

const appReducer = combineReducers({
  user: user,
});
export default appReducer;
