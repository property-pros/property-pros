import { routes } from "../../constants";
import { IPropertyProsNavigationFunctions } from "../../interface/IPropertyProsFunctions";
import cmds from "../cmds";

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
  *openStatementScreen() {
    yield cmds.call(navigate, routes.STATEMENT_VIEW_ROUTE);
  },
  *openAgreementScreen(agreemendId: string) {
    yield cmds.call(navigate, `${routes.NOTE_PURCHASE_AGREEMENT_VIEW_ROUTE}/${agreemendId}`)
  }
} as IPropertyProsNavigationFunctions;
