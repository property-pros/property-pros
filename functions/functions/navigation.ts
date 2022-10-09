import cmds from "../cmds";
import { routes } from "../../constants";
import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";

function* navigate(path: string) {
  yield cmds.navigate(path);
}

export default {
  navigate,
  *openSignInScreen() {
    yield cmds.call(navigate, routes.SIGN_IN);
  },
  *openSignUpScreen() {
    yield cmds.call(navigate, routes.SIGN_UP);
  },
  *openDashboardScreen() {
    yield cmds.call(navigate, routes.DASHBOARD);
  },
} as IPropertyProsFunctions;
