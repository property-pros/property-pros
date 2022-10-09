interface IPropertyProsFunctions
  extends IPropertyProsSignUpFunctions,
    IPropertyProseSignInFunctions {
  navigate(path: string): Promise<void> | Generator<never, void, unknown>;
  setEmail(): Promise<void> | Generator<never, void, unknown>;
  openSignInScreen(): Promise<void> | Generator<never, void, unknown>;
  openSignUpScreen(): Promise<void> | Generator<never, void, unknown>;
  openDashboardScreen(): Promise<void> | Generator<never, void, unknown>;
  setChangeRoute(boolean): Promise<void> | Generator<never, void, unknown>;
  getAppState(
    path: string | undefined
  ): Promise<DeepPartial<IPropertyProsState>>;
  init(config: any);
}

interface IPropertyProseSignInFunctions {
  signIn(): Promise<void> | Generator<never, void, unknown>;
  setSigninEmail(): Promise<void> | Generator<never, void, unknown>;
  setSigninPassword(): Promise<void> | Generator<never, void, unknown>;
}

interface IPropertyProsSignUpFunctions {
  signUp(): Promise<void> | Generator<never, void, unknown>;
  setSignUpPassword(string): Promise<void> | Generator<never, void, unknown>;
  setSignUpEmail(string): Promise<void> | Generator<never, void, unknown>;
  setSignUpLegalFirstName(string): Promise<void> | Generator<never, void, unknown>;
  setSignUpLegalLastName(string): Promise<void> | Generator<never, void, unknown>;
  setSignUpAddress(string): Promise<void> | Generator<never, void, unknown>;
  setSignUpLegalCellPhone(number): Promise<void> | Generator<never, void, unknown>;
  setSignUpLegalSocialSecurityNumber(string):
    | Promise<void>
    | Generator<never, void, unknown>;
  setSignUpTaxFilingStatus(string): Promise<void> | Generator<never, void, unknown>;
  setSignUpDate(string): Promise<void> | Generator<never, void, unknown>;
  setSignUpSignature(string): Promise<boolean> | Generator<never, void, unknown>;
  setSignUpPassword(string): Promise<void> | Generator<never, void, unknown>;
  setSignUpHasServedAsPlaintiff(boolean): Promise<void> | Generator<never, void, unknown>;
}

interface IPropertyProsNavigationFunctions {
  navigate(path: string): Promise<void> | Generator<never, void, unknown>;
  openSignInScreen(): Promise<void> | Generator<never, void, unknown>;
  openSignUpScreen(): Promise<void> | Generator<never, void, unknown>;
  openDashboardScreen(): Promise<void> | Generator<never, void, unknown>;
  setChangeRoute(boolean): Promise<void> | Generator<never, void, unknown>;
}
