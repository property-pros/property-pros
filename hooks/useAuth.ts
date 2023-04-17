import functions from "../functions";
import { useStore } from "react-redux";
import {
  IPropertyProsAuthenticatedUserState,
  IPropertyProsSignInState,
  IPropertyProsSignUpState,
  IPropertyProsState,
} from "../interface/interfaces";

import {
  IPropertyProsAuthenticatedUserFunctions,
  IPropertyProsSignUpFunctions,
  IPropertyProseSignInFunctions
} from "../interface/IPropertyProsFunctions"
import { AnyAction, Store } from "@reduxjs/toolkit";

export default (): IPropertyProsSignInState &
  IPropertyProsSignUpState &
  IPropertyProsAuthenticatedUserState &
  IPropertyProsAuthenticatedUserFunctions &
  IPropertyProsSignUpFunctions &
  IPropertyProseSignInFunctions => {
  const store: Store<IPropertyProsState, AnyAction> = useStore();

  const { signUp: signUpState, signIn: signInState, authenticatedUser: authenticatedUserState } = store.getState();

  return {
    setAuthenticated: functions.setAuthenticated,
    setAuthToken: functions.setAuthToken,
    signIn: functions.signIn,
    setSignInEmail: functions.setSignInEmail,
    setSignInPassword: functions.setSignInPassword,
    signUp: functions.signUp,
    setSignUpEmail: functions.setSignUpEmail,
    setSignUpPassword: functions.setSignUpPassword,
    setSignUpLegalFirstName: functions.setSignUpLegalFirstName,
    setSignUpLegalLastName: functions.setSignUpLegalLastName,
    setSignUpAddress: functions.setSignUpAddress,
    setSignUpDate: functions.setSignUpDate,
    setSignUpLegalCellPhone: functions.setSignUpLegalCellPhone,
    setSignUpLegalSocialSecurityNumber:
      functions.setSignUpLegalSocialSecurityNumber,
    setSignUpSignature: functions.setSignUpSignature,
    setSignUpTaxFilingStatus: functions.setSignUpTaxFilingStatus,
    setSignUpHasServedAsPlaintiff: functions.setSignUpHasServedAsPlaintiff,
    ...signUpState,
    ...signInState,
    ...authenticatedUserState,
  };
};
