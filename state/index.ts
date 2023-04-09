import { navigationReducer, actions as navigationActions } from "./navigation";
import {
  signInReducer,
  signUpReducer,
  authenticatedUserReducer,
  signinActions,
  signupActions,
  authenticatedUserActions,
} from "./auth";

const authActions = {...signinActions, ...signupActions, ...authenticatedUserActions}
// Action creators are generated for each case reducer function
export const actions = {
  ...authActions,
  ...navigationActions,
};

export type AuthActions = typeof authActions

export const reducers = {
  signIn: signInReducer,
  signUp: signUpReducer,
  authenticatedUser: authenticatedUserReducer,
  navigation: navigationReducer,
};
