import { combineReducers } from "redux";
import user from "./user_reducer";
import "antd/dist/antd.css";

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
