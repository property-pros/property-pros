import { useEffect, useState } from "react";
import { useStore, useDispatch } from "react-redux";
import functions from "../functions";
import { useNavigate } from "react-router-native";
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
    setChangeRoute: functions.setChangeRoute,
  };

  return navigationHelpers;
};
