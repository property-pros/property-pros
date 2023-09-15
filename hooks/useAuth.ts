import { Metadata } from "nice-grpc-common";

import { AnyAction, Store } from "@reduxjs/toolkit";
import { auth, notePurchaseAgreement } from "property-pros-sdk";
import { useStore } from "react-redux";
import functions from "../functions";
import { authClient } from "../functions/handlers/propertyProsSDK";
import {
  IPropertyProsAuthenticatedUserFunctions,
  IPropertyProsSignUpFunctions,
  IPropertyProseSignInFunctions,
} from "../interface/IPropertyProsFunctions";
import {
  IPropertyProsAuthenticatedUserState,
  IPropertyProsSignInState,
  IPropertyProsSignUpState,
  IPropertyProsState,
} from "../interface/interfaces";

export default (): IPropertyProsSignInState &
  IPropertyProsSignUpState &
  IPropertyProsAuthenticatedUserState &
  IPropertyProsAuthenticatedUserFunctions &
  IPropertyProsSignUpFunctions &
  IPropertyProseSignInFunctions => {
  const store: Store<IPropertyProsState, AnyAction> = useStore();

  const {
    signUp: signUpState,
    signIn: signInState,
    authenticatedUser: authenticatedUserState,
  } = store.getState();

  return {
    signIn: functions.signIn,
    setAuthenticated: functions.setAuthenticated,
    setAuthToken: functions.setAuthToken,
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

type AuthenticateUserResponse = auth.AuthenticateUserResponse;
type NotePurchaseAgreementRecord =
  notePurchaseAgreement.NotePurchaseAgreementRecord;

let metadata = new Metadata({});
export let metadataResult: Metadata = new Metadata();

export const authenticateUserOptions = {
  onHeader(header: any) {
    metadataResult = header;
  },
};

// function signInFn(store: Store<IPropertyProsState, AnyAction>) {
//   return async function () {
//     const {
//       signIn: { signInEmail, signInPassword },
//     } = store.getState();

//     console.log({ signInEmail, signInPassword });

//     let authResult: AuthenticateUserResponse = {
//       isAuthenticated: false,
//       errorMessage: "",
//     };

//     try {
//       console.log("authenticating user");
//       authResult = await authClient.authenticateUser(
//         {
//           payload: {
//             emailAddress: signInEmail,
//             password: signInPassword,
//           },
//         }
//       );
//       console.log("authenticated user");
//     } catch (err) {
//       console.log("authentication error: ", err);
//       throw err;
//     }

//     let authtoken = metadataResult.get("authorization");

//     console.log("authtoken: ", authtoken);
//   };
// }
