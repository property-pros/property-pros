import functions from "../functions";
import { useStore } from "react-redux";
import {
  IPropertyProsSignInState,
  IPropertyProsSignUpState,
  IPropertyProsState,
} from "../interface/interfaces";
import { AnyAction, Store } from "@reduxjs/toolkit";

export default (): INotePurchaseAgreementFunctions => {

  return {
    getNotePurchaseAgreementDoc: functions.getNotePurchaseAgreementDoc,
  };
};
