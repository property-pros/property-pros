import { useEffect } from "react";
import { useNavigate } from "react-router-native";
import functions from "../functions";
import { IPropertyProsNavigationHelper } from "../interface/interfaces";

export default (): IPropertyProsNavigationHelper => {
  const navigation = useNavigate();
  useEffect(() => {
    functions.init({ navigation });
  }, []);
  
  const navigationHelpers: IPropertyProsNavigationHelper = {
    navigate: functions.navigate,
    openSignInScreen: functions.openSignInScreen,
    openSignUpScreen: functions.openSignUpScreen,
    openDashboardScreen: functions.openDashboardScreen,
    openStatementScreen: functions.openStatementScreen,
    setChangeRoute: functions.setChangeRoute,
  };

  return navigationHelpers;
};
