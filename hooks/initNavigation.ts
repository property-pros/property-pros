import { useEffect } from "react";
import { useNavigate } from "react-router-native";
import functions from "../functions";
import { IPropertyProsNavigationHelper } from "../interface/interfaces";
import useNavigation from "./useNavigation";

export default (): IPropertyProsNavigationHelper => {
  const navigation = useNavigate();
  useEffect(() => {
    functions.init({ navigation });
  }, []);
  
  return useNavigation();  
};
