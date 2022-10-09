import cmds from "../cmds";
import { routes } from "../../constants";
import navigation from "./navigation"
import state from "./state"
import notePurchaseAgreement from "./notePurchaseAgreement";

export default {
  ...state,
  ...navigation,
  ...notePurchaseAgreement,
  *init(config: any){
    yield cmds.initNavigation(config)
  },
  *signIn() {
    yield cmds.navigate(routes.DASHBOARD_ROUTE)
  },
  *signUp() {
    yield cmds.navigate(routes.DASHBOARD_ROUTE)
  },
  *setEmail() {
    console.log("setEmail");
  },
  *setSignUpPassword() {
    console.log("setSignUpPassword");
  },
  *setSigninEmail() {
    console.log("setSigninEmail");
  },
  *setSigninPassword() {
    console.log("setSigninPassword");
  }
} as IPropertyProsFunctions;
