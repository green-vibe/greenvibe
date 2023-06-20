import { combineReducers } from "redux";

///////////////////
// module import //
///////////////////
import user from "./module/user";
import contract from "./module/contract";

const rootReducer = combineReducers({ user, contract });

export default rootReducer;
