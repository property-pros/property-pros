import { navigationReducer, actions as navigationActions } from "./navigation";
import {
  signInReducer,
  signUpReducer,
  signinActions,
  signupActions,
} from "./auth";

// Action creators are generated for each case reducer function
export const actions = {
  ...signinActions,
  ...signupActions,
  ...navigationActions,
};

export const reducers = {
  signIn: signInReducer,
  signUp: signUpReducer,
  navigation: navigationReducer,
};
