import { notepurchaseagreement as sdk } from "property-pros-sdk";
import { IPropertyProsState } from "./interfaces";

interface IPropertyProsFunctions
  extends IPropertyProsSignUpFunctions,
    IPropertyProseSignInFunctions,
    IPropertyProsAuthenticatedUserFunctions,
    IPropertyProsNotePurchaseAgreementFunctions {
  navigate(path: string): Promise<void> | Generator<never, void, unknown>;
  setEmail(): Promise<void> | Generator<never, void, unknown>;
  openSignInScreen(): Promise<void> | Generator<never, void, unknown>;
  openSignUpScreen(): Promise<void> | Generator<never, void, unknown>;
  openDashboardScreen(): Promise<void> | Generator<never, void, unknown>;
  openStatementScreen(): Promise<void> | Generator<never, void, unknown>;
  setChangeRoute(
    changeRoute: boolean
  ): Promise<void> | Generator<never, void, unknown>;
  getAppState(
    path: string | undefined
  ): Promise<sdk.DeepPartial<IPropertyProsState>>;
  init(config: any): Promise<void> | Generator<never, void, unknown>;
}

interface IPropertyProsNotePurchaseAgreementFunctions {
  getNotePurchaseAgreementDoc(): Promise<Buffer> | Generator<never, Buffer, any>;
}

interface IPropertyProsAuthenticatedUserFunctions {
  setAuthenticated(boolean): Promise<void> | Generator<never, void, unknown>;
  setAuthToken(Metadata): Promise<void> | Generator<never, void, unknown>;
}

interface IPropertyProseSignInFunctions {
  signIn(): Promise<void> | Generator<never, void, unknown>;
  setSignInEmail(): Promise<void> | Generator<never, void, unknown>;
  setSignInPassword(): Promise<void> | Generator<never, void, unknown>;
}

interface IPropertyProsSignUpFunctions {
  signUp(): Promise<void> | Generator<never, void, unknown>;
  setSignUpPassword(string): Promise<void> | Generator<never, void, unknown>;
  setSignUpEmail(string): Promise<void> | Generator<never, void, unknown>;
  setSignUpLegalFirstName(
    string
  ): Promise<void> | Generator<never, void, unknown>;
  setSignUpLegalLastName(
    string
  ): Promise<void> | Generator<never, void, unknown>;
  setSignUpAddress(string): Promise<void> | Generator<never, void, unknown>;
  setSignUpLegalCellPhone(
    number
  ): Promise<void> | Generator<never, void, unknown>;
  setSignUpLegalSocialSecurityNumber(
    string
  ): Promise<void> | Generator<never, void, unknown>;
  setSignUpTaxFilingStatus(
    string
  ): Promise<void> | Generator<never, void, unknown>;
  setSignUpDate(string): Promise<void> | Generator<never, void, unknown>;
  setSignUpSignature(
    string
  ): Promise<boolean> | Generator<never, void, unknown>;
  setSignUpPassword(string): Promise<void> | Generator<never, void, unknown>;
  setSignUpHasServedAsPlaintiff(
    boolean
  ): Promise<void> | Generator<never, void, unknown>;
}

interface IPropertyProsNavigationFunctions {
  navigate(path: string): Promise<void> | Generator<never, void, unknown>;
  openSignInScreen(): Promise<void> | Generator<never, void, unknown>;
  openSignUpScreen(): Promise<void> | Generator<never, void, unknown>;
  openDashboardScreen(): Promise<void> | Generator<never, void, unknown>;
  openStatementScreen(): Promise<void> | Generator<never, void, unknown>;
  setChangeRoute(boolean): Promise<void> | Generator<never, void, unknown>;
}
