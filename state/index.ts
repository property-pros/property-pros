import { navigationReducer, actions as navigationActions } from "./navigation";
import { generateFunctionsFromActions } from "effects-as-data-redux";

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

// It is not necessary to generate these functions but is convenient
// so that your application can talk to Redux indirectly through
// effects-as-data.  If your view only talks to effects-as-data,
// and effects-as-data talk to Redux, you'll have a clean unidirectional
// data-flow through the application.
export const reduxFunctions = generateFunctionsFromActions(actions);

export type AuthActions = typeof authActions

export const reducers = {
  signIn: signInReducer,
  signUp: signUpReducer,
  authenticatedUser: authenticatedUserReducer,
  navigation: navigationReducer,
};
