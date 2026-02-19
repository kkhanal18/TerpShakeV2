import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";

// import authReducer from './authReducer';
// import errorReducer from './errorReducer';
// import profileReducer from './profileReducer';
// import postReducer from './postReducer';

export default combineReducers({
  alert,
  auth,
  profile,
  post
  //   auth: authReducer,
  //   errors: errorReducer,
  //   profile: profileReducer,
  //   post: postReducer
});
