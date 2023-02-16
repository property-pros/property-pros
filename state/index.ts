import { navigationReducer, actions as navigationActions } from "./navigation";
import {
  signInReducer,
  signUpReducer,
  signinActions,
  signupActions,
} from "./auth";

const authActions = {...signinActions, ...signupActions}
// Action creators are generated for each case reducer function
export const actions = {
  ...authActions,
  ...navigationActions,
};

export type AuthActions = typeof authActions

export const reducers = {
  signIn: signInReducer,
  signUp: signUpReducer,
  navigation: navigationReducer,
};
