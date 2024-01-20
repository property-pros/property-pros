import { useEffect } from "react";
import { useNavigate } from "react-router-native";
import functions from "../functions";
import { IPropertyProsNavigationHelper } from "../interface/interfaces";

export default (): IPropertyProsNavigationHelper => {

  const navigationHelpers: IPropertyProsNavigationHelper = {
    navigate: functions.navigate,
    goBack: functions.goBack,
    openSignInScreen: functions.openSignInScreen,
    openSignUpScreen: functions.openSignUpScreen,
    openDashboardScreen: functions.openDashboardScreen,
    openStatementScreen: functions.openStatementScreen,
    openAgreementScreen: functions.openAgreementScreen,
    setChangeRoute: functions.setChangeRoute,
  };

  return navigationHelpers;
};
