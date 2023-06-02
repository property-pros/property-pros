import { PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { WizardValues } from "react-use-wizard";
import { IPropertyProsNavigationFunctions } from "./IPropertyProsFunctions";

interface IPropertyProsState {
  signIn: IPropertyProsSignInState;
  signUp: IPropertyProsSignUpState;
  authenticatedUser: IPropertyProsAuthenticatedUserState;
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
  signUpDate: string;
  signUpSignature: boolean;
  signUpHasServedAsPlaintiff: boolean;
  signUpCommittedPrinciple: string;
}

interface IPropertyProsSignInState {
  signInEmail: string;
  signInPassword: string;  
}

interface IPropertyProsAuthenticatedUserState {
  isAuthenticated: boolean
  authToken?: string
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
  setSignUpCommittedPrinciple(
    state: IPropertyProsSignUpState,
    action: PayloadAction<number>
  ): void;
  setSignUpDate(
    state: IPropertyProsSignUpState,
    action: PayloadAction<string>
  ): void;
  setSignUpSignature(
    state: IPropertyProsSignUpState,
    action: PayloadAction<bool>
  ): void;
  setSignUpPassword(
    state: IPropertyProsSignUpState,
    action: PayloadAction<string>
  ): void;
  setSignUpTaxFilingStatus(
    state: IPropertyProsSignUpState,
    action: PayloadAction<string>
  ): void;
  setSignUpHasServedAsPlaintiff(
    state: IPropertyProsSignUpState,
    action: PayloadAction<boolean>
  ): void;
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
  extends IPropertyProsNavigationFunctions {}

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
