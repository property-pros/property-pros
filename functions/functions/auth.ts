import cmds from "../cmds";
import { Metadata } from "nice-grpc-common";
import { Alert } from 'react-native';
import { useDispatch } from "react-redux";




import { reduxFunctions }  from "../";



import { routes } from "../../constants";
import {
  IPropertyProsSignUpState,
  IPropertyProsSignInState
} from "../../interface/interfaces";

import { authClient, notePurchaseAgreementDocClient } from "../handlers/propertyProsSDK";

import {
  AuthenticateUserResponse
} from "property-pros-sdk/api/auth/v1/auth"
import { NotePurchaseAgreementRecord } from "property-pros-sdk/api/note_purchase_agreement/v1/note_purchase_agreement";
import { actions } from "../../state";



export default {
   *signIn() {
    const {
      signInEmail,
      signInPassword
    }: IPropertyProsSignInState =  yield cmds.reduxGetState("signIn")

    let metadata = new Metadata({});
    let metadataResult: Metadata = new Metadata();

    let authResult: AuthenticateUserResponse = {
      isAuthenticated: false,
      errorMessage: ""
    }
    try {
      authResult = yield cmds.callFn(authClient.authenticateUser, {
        payload: { emailAddress: signInEmail, password: signInPassword }
      }, {
        metadata
        ,onHeader(header:any) {
          metadataResult = header;
        },
      })
    } catch(err) {
      Alert.alert("Login failed, please try again.")
      return
    }

    reduxFunctions.setAuthenticated(true);
    reduxFunctions.setAuthMetadata(metadata);

    yield cmds.navigate(routes.DASHBOARD_ROUTE);
  },
  *signUp() {
    const {
      signUpAddress,
      signUpDate,
      signUpEmail,
      signUpHasServedAsPlaintiff,
      signUpLegalCellPhone,
      signUpLegalFirstName,
      signUpLegalLastName,
      signUpLegalSocialSecurityNumber,
      signUpPassword,
      signUpSignature,
      signUpTaxFilingStatus,
      signUpCommittedPrinciple,
    }: IPropertyProsSignUpState = yield cmds.reduxGetState("signUp");

    let response:NotePurchaseAgreementRecord;
    try {
      response = yield cmds.callFn(notePurchaseAgreementDocClient.saveNotePurchaseAgreement, 
        {
          payload: {
            fundsCommitted: signUpCommittedPrinciple,
            firstName: signUpLegalFirstName,
            lastName: signUpLegalLastName,
            dateOfBirth: "15/12/1993", // TODO: add a DOB field in the UI component
            homeAddress: signUpAddress,
            phoneNumber: signUpLegalCellPhone,
            socialSecurity: signUpLegalSocialSecurityNumber,
            user: {
              emailAddress: signUpEmail,
              password: signUpPassword,
            }}
          
        })
      } catch(err) {
        Alert.alert("Registration failed, Please try again!")
        return
      }

    yield cmds.navigate(routes.SIGN_IN_ROUTE);
  },
};