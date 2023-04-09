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
  IPropertyProsSignUpFunctions &
  IPropertyProseSignInFunctions &
  IPropertyProsAuthenticatedUserFunctions => {
  const store: Store<IPropertyProsState, AnyAction> = useStore();

  const { signUp: signUpState, signIn: signInState, auth: authState } = store.getState();

  return {
    setAuthenticated: functions.setAuthenticated,
    setAuthMetadata: functions.setAuthMetadata,
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
    ...authState,// TODO if remove works
  };
};
