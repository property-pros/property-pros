import { PropsWithChildren, ReactChildren, ReactNode } from "react";

interface IPropertyProsState {
  signIn: IPropertyProsSignInState;
  signUp: IPropertyProsSignUpState;
  navigation: INavigationState;
}

interface IPropertyProsSignUpState {
  signUpEmail: string;
  signUpPassword: string;
  signUpLegalFirstName: string;
  signUpLegalLastName: string;
  signUpLegalCellPhone: string;

  signUpAddress: string;
  signUpLegalSocialSecurityNumber: nubmer;
  signUpTaxFilingStatus: string;
  signUpDate: Date;
  signUpSignature: boolean;
  signUpHasServedAsPlaintiff: boolean;
  signUpHasNotServedAsPlaintiff: boolean;
}

interface IPropertyProsSignInState {
  signInEmail: string;
  signInPassword: string;
}

interface IPropertyProsSignupStateActions {
  setSignUpPassword(
    state: IPropertyProsSignUpState,
    action: PayloadAction<string>
  ): void;
  setSignUpEmail(
    state: IPropertyProsSignUpState,
    action: PayloadAction<string>
  ): void;
  setSignUpLegalFirstName(
    state: IPropertyProsSignUpState,
    action: PayloadAction<string>
  ): void;
  setSignUpLegalLastName(
    state: IPropertyProsSignUpState,
    action: PayloadAction<string>
  ): void;
  setSignUpAddress(
    state: IPropertyProsSignUpState,
    action: PayloadAction<string>
  ): void;
  setSignUpLegalCellPhone(
    state: IPropertyProsSignUpState,
    action: PayloadAction<string>
  ): void;
  setSignUpLegalSocialSecurityNumber(
    state: IPropertyProsSignUpState,
    action: PayloadAction<string>
  ): void;
  setSignUpTaxFilingStatus(
    state: IPropertyProsSignUpState,
    action: PayloadAction<string>
  ): void;
  setSignUpDate(
    state: IPropertyProsSignUpState,
    action: PayloadAction<string>
  ): void;
  setSignUpSignature(
    state: IPropertyProsSignUpState,
    action: PayloadAction<string>
  ): void;
  setSignUpPassword(
    state: IPropertyProsSignUpState,
    action: PayloadAction<string>
  ): void;
}

interface IPropertyProsEffectCommands {
  call(fn: Function, ...args: any[]): Generator;
  reduxGetState(statePath?: string): Generator<unknown, EffectCommand, unknown>;
  state: {
    navigate(path: string): EffectCommand;
  };
  navigate(path: string): EffectCommand;
  initNavigation(config: IPropertyProsFunctionsInitConfig): void;
  getNotePurchaseAgreementDoc(): GetNotePurchaseAgreementDocResponse;
}

interface IPropertyProsFunctionsInitConfig {
  navigation: NavigateFunction;
}

interface EffectCommand {
  type: "callFn";
  fn: Function;
  args: []; // the arguments passed to get
}

interface YieldCommandResult {
  yieldReturns: YieldCommandResult;
  result: YieldCommandResult;
  yieldThrows: YieldCommandResult;
  interpreterThrows: YieldCommandResult;
  throws: YieldCommandResult;
  returns: YieldCommandResult;
}

interface INavigationState {
  currentRoute: string;
  changeRoute: boolean;
}

interface IPropertyProsNavigationHelper
  extends IPropertyProsNavigationFunctions {
  navigate: (string) => void;
}

interface IPropertyProsIntroQualificationProps {}
interface IPropertyProsIntroEarningsProps {}
interface IPropertyProsIntroSafetyProps {}
interface IPropertyProsIntroDurationProps {}
interface IPropertyProsIntroLiquidityProps {}
interface IPropertyProsIntroTaxationProps {}

interface IInvestorConfidentialInfoStep {}

interface IPropertyProsIntroItemProps extends WizardValues {
  title: string;
  children: ReactNode;
}

interface IPropertyProsSignUpItemProps {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}

interface INotePurchaseAgreementStepProps {}
