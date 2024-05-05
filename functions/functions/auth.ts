import { Alert } from "react-native";
import { routes } from "../../constants";
import {
  IPropertyProsSignInState,
  IPropertyProsSignUpState,
} from "../../interface/interfaces";
import cmds from "../cmds";
//TODO: use cmds to decrease dependencies.
import apiClient from "../handlers/propertyProsSDK";
import { auth, notePurchaseAgreement } from "property-pros-sdk";

type AuthenticateUserResponse = auth.AuthenticateUserResponse;
type NotePurchaseAgreementRecord =
  notePurchaseAgreement.NotePurchaseAgreementRecord;
let headerResult: any = null;

const { NotePurchaseAgreementService: notePurchaseAgreementClient } = apiClient;

export const authenticateUserOptions = {
  onHeader(header: any) {
    headerResult = header;
  },
};

export default {
  *signIn() {
    const { signInEmail, signInPassword }: IPropertyProsSignInState = yield cmds.reduxGetState("signIn");

    let authResult: AuthenticateUserResponse = {
      isAuthenticated: false,
      errorMessage: "",
    };
    
    try {
      authResult = yield cmds.authenticateUser(
        {
          payload: { emailAddress: signInEmail, password: signInPassword },
        },
        authenticateUserOptions
      );
      console.log("authResult: ", authResult);
    } catch (err) {
      throw err;
    }

    yield cmds.state.setAuthenticated(true);
    yield cmds.state.setAuthToken(headerResult.authToken);

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

    let response: NotePurchaseAgreementRecord;
    try {
      response = yield cmds.callFn(
        notePurchaseAgreementClient.saveNotePurchaseAgreement,
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
            },
          },
        }
      );
    } catch (err) {
      Alert.alert("Registration failed, Please try again!");
      return;
    }

    yield cmds.navigate(routes.SIGN_IN_ROUTE);
  },
};